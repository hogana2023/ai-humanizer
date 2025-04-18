import os
import json
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime

def analyze_test_results(results_file):
    """Analyze test results and generate visualizations"""
    
    # Create visualizations directory
    vis_dir = os.path.join(os.path.dirname(__file__), 'visualizations')
    os.makedirs(vis_dir, exist_ok=True)
    
    # Load test results
    with open(results_file, 'r') as f:
        results = json.load(f)
    
    if not results:
        print("No results to analyze")
        return
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # 1. Overall success rate by setting
    setting_names = list(set(r["humanization_settings"]["name"] for r in results))
    setting_success_rates = []
    
    for setting in setting_names:
        setting_results = [r for r in results if r["humanization_settings"]["name"] == setting]
        success_count = sum(1 for r in setting_results if r["improvement"]["bypass_success"])
        success_rate = (success_count / len(setting_results)) * 100 if setting_results else 0
        setting_success_rates.append(success_rate)
    
    plt.figure(figsize=(10, 6))
    plt.bar(setting_names, setting_success_rates, color='skyblue')
    plt.xlabel('Humanization Settings')
    plt.ylabel('Success Rate (%)')
    plt.title('AI Detection Bypass Success Rate by Setting')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    
    for i, rate in enumerate(setting_success_rates):
        plt.text(i, rate + 2, f'{rate:.1f}%', ha='center')
    
    success_rate_file = os.path.join(vis_dir, f'success_rate_by_setting_{timestamp}.png')
    plt.savefig(success_rate_file)
    plt.close()
    
    # 2. Score improvement by content type
    content_types = list(set(r["content_type"] for r in results))
    avg_improvements = []
    
    for content_type in content_types:
        type_results = [r for r in results if r["content_type"] == content_type]
        avg_improvement = sum(r["improvement"]["percentage_improvement"] for r in type_results) / len(type_results) if type_results else 0
        avg_improvements.append(avg_improvement)
    
    plt.figure(figsize=(10, 6))
    plt.bar(content_types, avg_improvements, color='lightgreen')
    plt.xlabel('Content Type')
    plt.ylabel('Average Improvement (%)')
    plt.title('Average Score Improvement by Content Type')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    
    for i, imp in enumerate(avg_improvements):
        plt.text(i, imp + 2, f'{imp:.1f}%', ha='center')
    
    improvement_file = os.path.join(vis_dir, f'improvement_by_content_{timestamp}.png')
    plt.savefig(improvement_file)
    plt.close()
    
    # 3. Before vs After scores
    original_scores = [r["original_detection"]["scores"]["overallHumanScore"] * 100 for r in results]
    humanized_scores = [r["humanized_detection"]["scores"]["overallHumanScore"] * 100 for r in results]
    
    test_ids = [r["test_id"] for r in results]
    
    plt.figure(figsize=(12, 8))
    
    x = np.arange(len(test_ids))
    width = 0.35
    
    plt.bar(x - width/2, original_scores, width, label='Original Text', color='salmon')
    plt.bar(x + width/2, humanized_scores, width, label='Humanized Text', color='lightblue')
    
    plt.xlabel('Test Case')
    plt.ylabel('Human Score (%)')
    plt.title('Human Score Comparison: Original vs. Humanized Text')
    plt.xticks(x, test_ids, rotation=90)
    plt.legend()
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()
    
    comparison_file = os.path.join(vis_dir, f'score_comparison_{timestamp}.png')
    plt.savefig(comparison_file)
    plt.close()
    
    # 4. Metrics correlation
    plt.figure(figsize=(10, 6))
    
    perplexity_values = [r["humanized_detection"]["scores"]["perplexity"] for r in results]
    burstiness_values = [r["humanized_detection"]["scores"]["burstiness"] for r in results]
    human_scores = [r["humanized_detection"]["scores"]["overallHumanScore"] for r in results]
    
    plt.scatter(perplexity_values, burstiness_values, c=human_scores, cmap='viridis', 
                s=100, alpha=0.7, edgecolors='w', linewidth=0.5)
    
    plt.colorbar(label='Human Score')
    plt.xlabel('Perplexity')
    plt.ylabel('Burstiness')
    plt.title('Relationship Between Perplexity, Burstiness, and Human Score')
    plt.grid(linestyle='--', alpha=0.7)
    
    correlation_file = os.path.join(vis_dir, f'metrics_correlation_{timestamp}.png')
    plt.savefig(correlation_file)
    plt.close()
    
    # Return paths to visualization files
    return {
        'success_rate': success_rate_file,
        'improvement': improvement_file,
        'comparison': comparison_file,
        'correlation': correlation_file
    }

if __name__ == "__main__":
    # Find the most recent results file
    results_dir = os.path.join(os.path.dirname(__file__), 'results')
    if not os.path.exists(results_dir):
        print("Results directory not found")
        exit(1)
        
    results_files = [f for f in os.listdir(results_dir) if f.startswith('test_results_')]
    if not results_files:
        print("No test results found")
        exit(1)
        
    latest_file = max(results_files, key=lambda f: os.path.getmtime(os.path.join(results_dir, f)))
    latest_path = os.path.join(results_dir, latest_file)
    
    print(f"Analyzing results from {latest_path}")
    vis_files = analyze_test_results(latest_path)
    
    if vis_files:
        print("Analysis complete. Visualization files:")
        for name, path in vis_files.items():
            print(f"- {name}: {path}")
