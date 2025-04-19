// src/app/api/samples/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Sample text types
const sampleTexts = {
  academic: {
    short: `The correlation between socioeconomic status and educational outcomes has been extensively studied in recent decades. Research indicates that students from higher-income backgrounds typically have access to more educational resources, resulting in better academic performance on average. However, this relationship is not deterministic, as numerous other factors including parental involvement, school quality, and individual motivation also play significant roles in educational achievement.`,
    
    medium: `The correlation between socioeconomic status and educational outcomes has been extensively studied in recent decades. Research indicates that students from higher-income backgrounds typically have access to more educational resources, resulting in better academic performance on average. However, this relationship is not deterministic, as numerous other factors including parental involvement, school quality, and individual motivation also play significant roles in educational achievement.

    Multiple longitudinal studies have demonstrated that early childhood interventions can significantly mitigate the effects of socioeconomic disadvantage on educational outcomes. Programs that provide comprehensive support services, including high-quality preschool education, healthcare, and family support, have shown promising results in narrowing achievement gaps. The Perry Preschool Project and the Abecedarian Project, two well-known early intervention programs, have documented substantial long-term benefits for participants, including higher high school graduation rates, higher earnings, and lower rates of criminal activity.

    Furthermore, recent research in educational psychology has highlighted the importance of non-cognitive skills, such as perseverance, self-regulation, and growth mindset, in academic success. These skills appear to be particularly valuable for students facing socioeconomic challenges, as they can help individuals navigate obstacles and persist through difficulties. Educational institutions are increasingly incorporating explicit instruction in these skills into their curricula, recognizing their importance alongside traditional academic content.`,
    
    long: `The correlation between socioeconomic status and educational outcomes has been extensively studied in recent decades. Research indicates that students from higher-income backgrounds typically have access to more educational resources, resulting in better academic performance on average. However, this relationship is not deterministic, as numerous other factors including parental involvement, school quality, and individual motivation also play significant roles in educational achievement.

    Multiple longitudinal studies have demonstrated that early childhood interventions can significantly mitigate the effects of socioeconomic disadvantage on educational outcomes. Programs that provide comprehensive support services, including high-quality preschool education, healthcare, and family support, have shown promising results in narrowing achievement gaps. The Perry Preschool Project and the Abecedarian Project, two well-known early intervention programs, have documented substantial long-term benefits for participants, including higher high school graduation rates, higher earnings, and lower rates of criminal activity.

    Furthermore, recent research in educational psychology has highlighted the importance of non-cognitive skills, such as perseverance, self-regulation, and growth mindset, in academic success. These skills appear to be particularly valuable for students facing socioeconomic challenges, as they can help individuals navigate obstacles and persist through difficulties. Educational institutions are increasingly incorporating explicit instruction in these skills into their curricula, recognizing their importance alongside traditional academic content.

    The digital divide represents another dimension of educational inequality related to socioeconomic status. Access to technology and high-speed internet has become increasingly essential for educational success, particularly in light of the shift toward online and hybrid learning models. Students without reliable access to these resources face significant disadvantages in completing homework assignments, conducting research, and participating in virtual learning environments. Policy initiatives aimed at expanding broadband access and providing devices to underserved communities seek to address this aspect of educational inequality.

    Teacher quality and retention also vary significantly across schools serving different socioeconomic populations. High-poverty schools often struggle to attract and retain experienced teachers, leading to higher rates of teacher turnover and a greater proportion of inexperienced educators. This disparity in teacher experience and stability can exacerbate existing achievement gaps. Comprehensive approaches to educational equity must therefore address teacher preparation, compensation, and working conditions to ensure that all students have access to effective instruction.

    The intersection of race, ethnicity, and socioeconomic status further complicates the relationship between economic factors and educational outcomes. Historical patterns of discrimination and segregation have created persistent structural inequalities in educational opportunities. Addressing these complex, interconnected disparities requires multifaceted approaches that consider both socioeconomic factors and the specific challenges faced by different racial and ethnic groups.`
  },
  
  creative: {
    short: `The old lighthouse stood sentinel at the edge of the world, its beam cutting through the dense fog that had settled over the bay. Marina wrapped her woolen scarf tighter as the wind picked up, carrying with it the scent of salt and memories. Twenty years had passed since she'd last stood on these rocks, yet the rhythm of the waves against the shore remained unchanged—a constant in a life that had seen too much transformation.`,
    
    medium: `The old lighthouse stood sentinel at the edge of the world, its beam cutting through the dense fog that had settled over the bay. Marina wrapped her woolen scarf tighter as the wind picked up, carrying with it the scent of salt and memories. Twenty years had passed since she'd last stood on these rocks, yet the rhythm of the waves against the shore remained unchanged—a constant in a life that had seen too much transformation.

    She reached into her pocket and felt the smooth edges of the brass key, worn from decades of being turned in the same lock. Her grandfather's final letter had been cryptic, as was his way. "When you're ready to understand, the lighthouse will show you the way," he'd written. Marina had dismissed it as the poetic ramblings of a man who'd spent too many years in isolation, watching the horizon for ships that might never come. But after his funeral, when the family lawyer had handed her the key with a knowing look, something stirred within her—a curiosity that had finally, after all these years, brought her back to Blackrock Point.

    The wooden door creaked in protest as she pushed it open, revealing a spiral staircase coated in dust and forgotten promises. Marina hesitated at the threshold, suddenly aware of the weight of her grandfather's legacy. What secrets had he kept in this tower of stone and light? What truths awaited her at the top of those stairs? Taking a deep breath, she stepped inside, letting the door swing closed behind her. The sound echoed through the empty space like a full stop at the end of one chapter—and the beginning of another.`,
    
    long: `The old lighthouse stood sentinel at the edge of the world, its beam cutting through the dense fog that had settled over the bay. Marina wrapped her woolen scarf tighter as the wind picked up, carrying with it the scent of salt and memories. Twenty years had passed since she'd last stood on these rocks, yet the rhythm of the waves against the shore remained unchanged—a constant in a life that had seen too much transformation.

    She reached into her pocket and felt the smooth edges of the brass key, worn from decades of being turned in the same lock. Her grandfather's final letter had been cryptic, as was his way. "When you're ready to understand, the lighthouse will show you the way," he'd written. Marina had dismissed it as the poetic ramblings of a man who'd spent too many years in isolation, watching the horizon for ships that might never come. But after his funeral, when the family lawyer had handed her the key with a knowing look, something stirred within her—a curiosity that had finally, after all these years, brought her back to Blackrock Point.

    The wooden door creaked in protest as she pushed it open, revealing a spiral staircase coated in dust and forgotten promises. Marina hesitated at the threshold, suddenly aware of the weight of her grandfather's legacy. What secrets had he kept in this tower of stone and light? What truths awaited her at the top of those stairs? Taking a deep breath, she stepped inside, letting the door swing closed behind her. The sound echoed through the empty space like a full stop at the end of one chapter—and the beginning of another.

    Each step groaned beneath her weight as she ascended, running her fingers along the cool stone wall for balance. Cobwebs clung to the corners, and the air grew thicker with the scent of dust and disuse. Halfway up, a small window offered a glimpse of the churning sea below, now barely visible through the encroaching darkness. Night was falling quickly, as it always did in November on this remote stretch of coastline. Marina quickened her pace, guided by some inexplicable urgency.

    The lantern room at the top of the lighthouse was smaller than she remembered from childhood visits. The massive Fresnel lens dominated the circular space, its intricate prisms catching what little daylight remained and scattering it in rainbow fragments across the floor. Marina stood transfixed by the spectacle for a moment before noticing the old desk pushed against the far wall—her grandfather's workspace, where he'd kept his logs and written his poetry during the long, solitary nights.

    The desk drawer was locked, but Marina knew immediately that this was where her key belonged. It slid in perfectly, turning with a satisfying click. Inside lay a leather-bound journal, its pages yellowed with age, and beneath it, a folded map marked with strange symbols and annotations in her grandfather's distinctive handwriting. But what caught her eye was the photograph tucked into the journal's first page—a faded image of her grandfather standing beside a woman Marina had never seen before. They were smiling, arms around each other, the lighthouse visible in the background. Marina turned the photo over and read the inscription: "Elizabeth and me, the day we found it. May 15, 1967."

    Who was Elizabeth? And what had they found? Marina settled into the old chair, opened the journal, and began to read as darkness enveloped the lighthouse completely. Outside, the automated beam—installed years after her grandfather's retirement—began its rhythmic sweep across the bay, illuminating the fog in steady pulses. But Marina barely noticed. She was already lost in a story that would change everything she thought she knew about her family—and herself.`
  },
  
  technical: {
    short: `React hooks provide a way to use state and other React features without writing a class component. The useState hook is particularly useful for managing local component state. When called, it returns a stateful value and a function to update that value. This pattern simplifies state management compared to the traditional setState method used in class components.`,
    
    medium: `React hooks provide a way to use state and other React features without writing a class component. The useState hook is particularly useful for managing local component state. When called, it returns a stateful value and a function to update that value. This pattern simplifies state management compared to the traditional setState method used in class components.

    The useEffect hook serves as a replacement for lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount. It accepts a function that contains imperative, possibly effectful code. By default, effects run after every completed render, but you can optimize performance by skipping effects if certain values haven't changed. This is done by passing an array as an optional second argument to useEffect.

    Custom hooks allow you to extract component logic into reusable functions. A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks. For example, you might create a useFormInput hook to handle form field validation and state management across multiple components. This promotes code reuse and helps separate concerns in your application.`,
    
    long: `React hooks provide a way to use state and other React features without writing a class component. The useState hook is particularly useful for managing local component state. When called, it returns a stateful value and a function to update that value. This pattern simplifies state management compared to the traditional setState method used in class components.

    The useEffect hook serves as a replacement for lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount. It accepts a function that contains imperative, possibly effectful code. By default, effects run after every completed render, but you can optimize performance by skipping effects if certain values haven't changed. This is done by passing an array as an optional second argument to useEffect.

    Custom hooks allow you to extract component logic into reusable functions. A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks. For example, you might create a useFormInput hook to handle form field validation and state management across multiple components. This promotes code reuse and helps separate concerns in your application.

    The useContext hook provides a way to pass data through the component tree without having to pass props down manually at every level. It accepts a context object (the value returned from React.createContext) and returns the current context value for that context. The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.

    For performance optimization, React offers the useMemo and useCallback hooks. useMemo returns a memoized value that only recalculates when one of its dependencies changes, which can prevent expensive calculations on every render. Similarly, useCallback returns a memoized callback that only changes if one of its dependencies changes, which is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

    The useReducer hook is an alternative to useState for managing complex state logic. It accepts a reducer function of type (state, action) => newState, similar to how Redux works. This hook is preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.`
  },
  
  article: {
    short: `The rise of artificial intelligence in content creation has sparked debates about authenticity and originality in digital media. AI tools can now generate articles, essays, and creative works that are increasingly difficult to distinguish from human-written content. This technological advancement raises important questions about the future of writing professions and the value we place on human creativity.`,
    
    medium: `The rise of artificial intelligence in content creation has sparked debates about authenticity and originality in digital media. AI tools can now generate articles, essays, and creative works that are increasingly difficult to distinguish from human-written content. This technological advancement raises important questions about the future of writing professions and the value we place on human creativity.

    Educational institutions have been particularly affected by these developments. Many universities report an increase in AI-generated assignments, prompting educators to reconsider assessment methods and plagiarism policies. Some schools have implemented specialized detection software, while others are shifting toward in-class assessments or project-based learning that emphasizes process over final product. The challenge lies in balancing technological innovation with academic integrity and the development of genuine writing skills.

    Content publishers face similar dilemmas as they navigate this new landscape. Some media outlets have established explicit policies regarding AI-generated content, requiring disclosure when automation tools are used in the creation process. Others have doubled down on human-created content as a differentiating factor in their brand identity. The economic implications are significant, as AI can produce content at a fraction of the cost of human writers, potentially disrupting traditional publishing models.`,
    
    long: `The rise of artificial intelligence in content creation has sparked debates about authenticity and originality in digital media. AI tools can now generate articles, essays, and creative works that are increasingly difficult to distinguish from human-written content. This technological advancement raises important questions about the future of writing professions and the value we place on human creativity.

    Educational institutions have been particularly affected by these developments. Many universities report an increase in AI-generated assignments, prompting educators to reconsider assessment methods and plagiarism policies. Some schools have implemented specialized detection software, while others are shifting toward in-class assessments or project-based learning that emphasizes process over final product. The challenge lies in balancing technological innovation with academic integrity and the development of genuine writing skills.

    Content publishers face similar dilemmas as they navigate this new landscape. Some media outlets have established explicit policies regarding AI-generated content, requiring disclosure when automation tools are used in the creation process. Others have doubled down on human-created content as a differentiating factor in their brand identity. The economic implications are significant, as AI can produce content at a fraction of the cost of human writers, potentially disrupting traditional publishing models.

    The legal framework surrounding AI-generated content remains underdeveloped. Copyright law traditionally protects works of human authorship, leaving questions about the ownership and protection of AI-created materials. Some jurisdictions have begun to address these issues, but global consensus is lacking. This legal uncertainty affects content creators, publishers, and technology developers alike, as they attempt to establish rights and responsibilities in this evolving domain.

    Despite concerns, AI tools also present opportunities for enhancing human creativity rather than replacing it. Many writers and content creators use AI as a collaborative tool—generating ideas, overcoming writer's block, or handling routine aspects of content production. This human-AI collaboration model suggests a future where technology augments creative processes rather than rendering them obsolete. The most successful implementations may be those that leverage AI capabilities while maintaining the human elements that readers ultimately connect with.

    The ability to detect AI-generated content has become increasingly important in this environment. Various detection methods have emerged, analyzing patterns in text that might indicate non-human authorship. However, as generation algorithms improve, detection becomes more challenging, creating a technological arms race between creation and identification tools. This dynamic highlights the need for multifaceted approaches to addressing the challenges posed by AI in content creation, including technological, educational, and policy-based solutions.`
  }
};

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'article';
    const length = searchParams.get('length') || 'medium';
    
    // Validate parameters
    const validTypes = ['academic', 'creative', 'technical', 'article'];
    const validLengths = ['short', 'medium', 'long'];
    
    const validatedType = validTypes.includes(type as string) ? type : 'article';
    const validatedLength = validLengths.includes(length as string) ? length : 'medium';
    
    // Get the sample text
    const sampleText = sampleTexts[validatedType as keyof typeof sampleTexts][validatedLength as keyof typeof sampleTexts.academic];
    
    // Count words for metadata
    const wordCount = sampleText.split(/\s+/).length;
    
    return NextResponse.json({
      success: true,
      sampleText,
      metadata: {
        type: validatedType,
        length: validatedLength,
        wordCount
      }
    });
    
  } catch (error) {
    console.error('Error in samples API:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to retrieve sample text" 
    }, { status: 500 });
  }
}
