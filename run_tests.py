import requests
import json
import time
import os
from datetime import datetime

# Create results directory
results_dir = os.path.join(os.path.dirname(__file__), 'results')
os.makedirs(results_dir, exist_ok=True)

# Test configuration
test_cases = [
    {
        "id": "academic_short",
        "type": "academic",
        "length": "short"
    },
    {
        "id": "creative_medium",
        "type": "creative",
        "length": "medium"
    },
    {
        "id": "technical_short",
        "type": "technical",
        "length": "short"
    },
    {
        "id": "article_medium",
        "type": "article",
        "length": "medium"
    }
]

humanization_settings = [
    {
        "name": "standard_low",
        "mode": "standard",
        "intensity": 0.3,
        "settings": {
            "perplexity": 0.4,
            "burstiness": 0.5,
            "vocabularyDiversity": 0.4,
            "sentenceVariation": 0.4,
            "addHumanElements": True,
            "preserveFormatting": True
        }
    },
    {
        "name": "standard_high",
        "mode": "standard",
        "intensity": 0.9,
        "settings": {
            "perplexity": 0.8,
            "burstiness": 0.9,
            "vocabularyDiversity": 0.8,
            "sentenceVariation": 0.8,
            "addHumanElements": True,
            "preserveFormatting": True
        }
    },
    {
        "name": "academic_medium",
        "mode": "academic",
        "intensity": 0.6,
        "settings": {
            "perplexity": 0.6,
            "burstiness": 0.5,
            "vocabularyDiversity": 0.7,
            "sentenceVariation": 0.6,
            "addHumanElements": True,
            "preserveFormatting": True
        }
    },
    {
        "name": "creative_high",
        "mode": "creative",
        "intensity": 0.8,
        "settings": {
            "perplexity": 0.7,
            "burstiness": 0.9,
            "vocabularyDiversity": 0.8,
            "sentenceVariation": 0.7,
            "addHumanElements": True,
            "preserveFormatting": True
        }
    }
]

# API endpoints
SAMPLES_API = "http://localhost:3001/api/samples"
HUMANIZE_API = "http://localhost:3001/api/humanize"
DETECT_API = "http://localhost:3001/api/detect"

def get_sample_text(test_case):
    """Fetch sample text from the samples API"""
    params = {
        "type": test_case["type"],
        "length": test_case["length"]
    }
    
    try:
        response = requests.get(SAMPLES_API, params=params)
        response.raise_for_status()
        return response.json()["sampleText"]
    except Exception as e:
        print(f"Error fetching sample text: {e}")
        return None

def detect_ai_text(text):
    """Check if text is detected as AI-generated using our detection API"""
    try:
        response = requests.post(DETECT_API, json={"text": text})
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error detecting AI text: {e}")
        return None

def humanize_text(text, settings):
    """Humanize text using our humanization API"""
    payload = {
        "text": text,
        "mode": settings["mode"],
        "intensity": settings["intensity"],
        "settings": settings["settings"]
    }
    
    try:
        response = requests.post(HUMANIZE_API, json=payload)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error humanizing text: {e}")
        return None

def run_tests():
    """Run the test suite and save results"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    results_file = os.path.join(results_dir, f"test_results_{timestamp}.json")
    
    all_results = []
    
    for test_case in test_cases:
        print(f"\nTesting {test_case['id']}...")
        
        # Get sample text
        original_text = get_sample_text(test_case)
        if not original_text:
            print(f"Skipping {test_case['id']} due to error fetching sample text")
            continue
            
        # Check original text with our detector
        original_detection = detect_ai_text(original_text)
        if not original_detection:
            print(f"Skipping {test_case['id']} due to error in detection")
            continue
            
        print(f"Original text AI score: {original_detection['scores']['overallHumanScore']:.2f}")
        
        # Test with different humanization settings
        for setting in humanization_settings:
            print(f"  Testing with {setting['name']} settings...")
            
            # Humanize the text
            humanized_result = humanize_text(original_text, setting)
            if not humanized_result:
                print(f"  Skipping {setting['name']} due to error in humanization")
                continue
                
            humanized_text = humanized_result["humanizedText"]
            
            # Check humanized text with our detector
            humanized_detection = detect_ai_text(humanized_text)
            if not humanized_detection:
                print(f"  Skipping {setting['name']} due to error in detection")
                continue
                
            # Calculate improvement
            original_score = original_detection["scores"]["overallHumanScore"]
            humanized_score = humanized_detection["scores"]["overallHumanScore"]
            improvement = humanized_score - original_score
            
            print(f"  Humanized text AI score: {humanized_score:.2f} (Improvement: {improvement:.2f})")
            
            # Save detailed results
            test_result = {
                "test_id": f"{test_case['id']}_{setting['name']}",
                "content_type": test_case["type"],
                "length": test_case["length"],
                "original_text": original_text,
                "original_detection": original_detection,
                "humanization_settings": setting,
                "humanized_text": humanized_text,
                "humanized_detection": humanized_detection,
                "improvement": {
                    "score_difference": improvement,
                    "percentage_improvement": (improvement / max(0.01, original_score)) * 100,
                    "bypass_success": humanized_score > 0.7  # Consider >70% human score as success
                },
                "stats": humanized_result.get("stats", {})
            }
            
            all_results.append(test_result)
    
    # Save all results to file
    with open(results_file, 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print(f"\nAll test results saved to {results_file}")
    
    # Generate summary
    successful_tests = sum(1 for result in all_results if result["improvement"]["bypass_success"])
    total_tests = len(all_results)
    success_rate = (successful_tests / total_tests) * 100 if total_tests > 0 else 0
    
    avg_improvement = sum(result["improvement"]["percentage_improvement"] for result in all_results) / total_tests if total_tests > 0 else 0
    
    print("\nTest Summary:")
    print(f"Total tests: {total_tests}")
    print(f"Successful bypasses: {successful_tests}")
    print(f"Success rate: {success_rate:.2f}%")
    print(f"Average improvement: {avg_improvement:.2f}%")
    
    # Save summary
    summary_file = os.path.join(results_dir, f"summary_{timestamp}.txt")
    with open(summary_file, 'w') as f:
        f.write("AI Humanizer Test Summary\n")
        f.write("=======================\n\n")
        f.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(f"Total tests: {total_tests}\n")
        f.write(f"Successful bypasses: {successful_tests}\n")
        f.write(f"Success rate: {success_rate:.2f}%\n")
        f.write(f"Average improvement: {avg_improvement:.2f}%\n\n")
        
        f.write("Detailed Results by Test Case:\n")
        for test_case in test_cases:
            f.write(f"\n{test_case['id'].upper()}:\n")
            case_results = [r for r in all_results if r["test_id"].startswith(test_case["id"])]
            for result in case_results:
                setting_name = result["humanization_settings"]["name"]
                original_score = result["original_detection"]["scores"]["overallHumanScore"]
                humanized_score = result["humanized_detection"]["scores"]["overallHumanScore"]
                improvement = result["improvement"]["percentage_improvement"]
                success = "✓" if result["improvement"]["bypass_success"] else "✗"
                
                f.write(f"  {setting_name}: {original_score:.2f} → {humanized_score:.2f} ({improvement:.2f}%) {success}\n")
    
    print(f"Summary saved to {summary_file}")
    return summary_file, results_file

if __name__ == "__main__":
    print("Starting AI Humanizer effectiveness tests...")
    run_tests()
