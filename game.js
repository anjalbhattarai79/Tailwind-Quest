// ProgressTracker class (needs to be defined first)
class ProgressTracker {
    constructor() {
        this.topics = {
            'Spacing Basics': { completed: 0, total: 3 },
            'Colors & Backgrounds': { completed: 0, total: 4 },
            'Flexbox': { completed: 0, total: 5 },
            'Responsive Design': { completed: 0, total: 5 },
            'Typography': { completed: 0, total: 4 },
            'Transitions & Animation': { completed: 0, total: 4 },
            'CSS Grid': { completed: 0, total: 5},
            'Component Layouts': { completed: 0, total: 5 }
        };
        
        this.loadProgress();
    }
    
    loadProgress() {
        const savedProgress = localStorage.getItem('tailwindQuestProgress');
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress);
                for (const topic in progress) {
                    if (this.topics[topic]) {
                        this.topics[topic].completed = progress[topic].completed;
                    }
                }
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }
    }
    
    saveProgress() {
        localStorage.setItem('tailwindQuestProgress', JSON.stringify(this.topics));
    }
    
    completeChallenge(topic) {
        if (this.topics[topic] && this.topics[topic].completed < this.topics[topic].total) {
            this.topics[topic].completed++;
            this.saveProgress();
            return true;
        }
        return false;
    }
    
    getTopicProgress(topic) {
        return this.topics[topic] || { completed: 0, total: 0 };
    }
    
    getOverallProgress() {
        let completed = 0;
        let total = 0;
        
        for (const topic in this.topics) {
            completed += this.topics[topic].completed;
            total += this.topics[topic].total;
        }
        
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    }
}

// Tailwind CSS Learning Game
class TailwindLearningGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.completedChallenges = 0;
        this.conceptsLearned = 0;
        this.currentChallengeIndex = 0;
        this.learningPath = this.createLearningPath();
        this.currentTopic = 'Spacing Basics';
        this.selectedTopic = null;
        
        // Initialize progress tracker
        this.progressTracker = new ProgressTracker();
        
        this.setupEventListeners();
        this.updateUI();
        
        // Only load challenge if we're on the game page
        if (document.getElementById('gameScreen')) {
            // Get topic from URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const topicFromUrl = urlParams.get('topic');
            
            if (topicFromUrl && this.learningPath[topicFromUrl]) {
                this.currentTopic = topicFromUrl;
            }
            
            this.loadCurrentChallenge();
        }
    }

    createLearningPath() {
        return {
            'Spacing Basics': {
                challenges: [
                    { title: 'Add Padding', description: 'Add padding to the box using the p-4 class', correctAnswer: 'p-4', hint: 'Use p-4 for padding on all sides', explanation: 'p-4 adds 1rem (16px) of padding to all sides of the element.', previewContent: 'Box content', previewClasses: 'bg-gray-200 text-gray-800 rounded' },
                    { title: 'Add Margin', description: 'Add margin to the box using the m-2 class', correctAnswer: 'm-2', hint: 'Use m-2 for margin on all sides', explanation: 'm-2 adds 0.5rem (8px) of margin to all sides of the element.', previewContent: 'Box content', previewClasses: 'bg-gray-200 text-gray-800 rounded' },
                    { title: 'Add Top Padding', description: 'Add padding only to the top using pt-6', correctAnswer: 'pt-6', hint: 'Use pt-6 for top padding only', explanation: 'pt-6 adds 1.5rem (24px) of padding to the top of the element.', previewContent: 'Box content', previewClasses: 'bg-gray-200 text-gray-800 rounded' }
                ]
            },
            'Colors & Backgrounds': {
                challenges: [
                    { title: 'Change Background Color', description: 'Change the background color to blue using bg-blue-500', correctAnswer: 'bg-blue-500', hint: 'Use bg-blue-500 for a blue background', explanation: 'bg-blue-500 applies a medium blue background color.', previewContent: 'Colored box', previewClasses: 'text-white rounded p-4' },
                    { title: 'Change Text Color', description: 'Change the text color to red using text-red-600', correctAnswer: 'text-red-600', hint: 'Use text-red-600 for red text', explanation: 'text-red-600 applies a medium red color to the text.', previewContent: 'Red text', previewClasses: 'bg-white rounded p-4' },
                    { title: 'Add Border Color', description: 'Add a green border using border-green-400', correctAnswer: 'border-green-400', hint: 'Use border-green-400 for a green border', explanation: 'border-green-400 adds a light green border to the element.', previewContent: 'Bordered box', previewClasses: 'bg-white rounded p-4 border-2' },
                    { title: 'Add Background Gradient', description: 'Add a gradient background using bg-gradient-to-r from-blue-400 to-green-400', correctAnswer: 'bg-gradient-to-r from-blue-400 to-green-400', hint: 'Use bg-gradient-to-r from-blue-400 to-green-400 for a gradient', explanation: 'This creates a left-to-right blue-to-green gradient.', previewContent: 'Gradient box', previewClasses: 'text-white rounded p-4' }
                ]
            },
            'Typography': {
                challenges: [
                    { title: 'Bold Text', description: 'Make the text bold using font-bold', correctAnswer: 'font-bold', hint: 'Use font-bold for bold text', explanation: 'font-bold makes the text bold.', previewContent: 'Bold text', previewClasses: 'bg-white rounded p-4' },
                    { title: 'Italic Text', description: 'Make the text italic using italic', correctAnswer: 'italic', hint: 'Use italic for italic text', explanation: 'italic makes the text italic.', previewContent: 'Italic text', previewClasses: 'bg-white rounded p-4' },
                    { title: 'Large Text', description: 'Make the text large using text-2xl', correctAnswer: 'text-2xl', hint: 'Use text-2xl for large text', explanation: 'text-2xl increases the font size.', previewContent: 'Large text', previewClasses: 'bg-white rounded p-4' },
                    { title: 'Underline Text', description: 'Underline the text using underline', correctAnswer: 'underline', hint: 'Use underline for underlined text', explanation: 'underline adds a line below the text.', previewContent: 'Underlined text', previewClasses: 'bg-white rounded p-4' }
                ]
            },
            'Transitions & Animation': {
                challenges: [
                    { title: 'Add Transition', description: 'Add a transition to the box using transition-all', correctAnswer: 'transition-all', hint: 'Use transition-all for smooth transitions', explanation: 'transition-all enables transitions for all properties.', previewContent: 'Transition box', previewClasses: 'bg-white rounded p-4' },
                    { title: 'Add Duration', description: 'Set the transition duration to 500ms using duration-500', correctAnswer: 'duration-500', hint: 'Use duration-500 for 500ms duration', explanation: 'duration-500 sets the transition duration.', previewContent: 'Duration box', previewClasses: 'bg-white rounded p-4 transition-all' },
                    { title: 'Add Hover Effect', description: 'Change background on hover using hover:bg-green-400', correctAnswer: 'hover:bg-green-400', hint: 'Use hover:bg-green-400 for hover effect', explanation: 'hover:bg-green-400 changes the background color on hover.', previewContent: 'Hover me', previewClasses: 'bg-blue-400 rounded p-4 transition-all duration-500' },
                    { title: 'Add Animation', description: 'Add a bounce animation using animate-bounce', correctAnswer: 'animate-bounce', hint: 'Use animate-bounce for bouncing animation', explanation: 'animate-bounce makes the element bounce.', previewContent: 'Bouncing box', previewClasses: 'bg-white rounded p-4' }
                ]
            },
            'Flexbox': {
                challenges: [
                    { title: 'Flex Container', description: 'Make the container a flexbox using flex', correctAnswer: 'flex', hint: 'Use flex for flex container', explanation: 'flex enables flexbox layout.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4' },
                    { title: 'Justify Center', description: 'Center items horizontally using justify-center', correctAnswer: 'justify-center', hint: 'Use justify-center for horizontal centering', explanation: 'justify-center centers items horizontally.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 flex' },
                    { title: 'Align Items Center', description: 'Center items vertically using items-center', correctAnswer: 'items-center', hint: 'Use items-center for vertical centering', explanation: 'items-center centers items vertically.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 flex' },
                    { title: 'Add Gap', description: 'Add space between items using gap-4', correctAnswer: 'gap-4', hint: 'Use gap-4 for spacing', explanation: 'gap-4 adds space between flex items.', previewContent: '<div class="bg-blue-200 p-2 rounded">Item 1</div><div class="bg-green-200 p-2 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 flex' },
                    { title: 'Wrap Items', description: 'Allow items to wrap using flex-wrap', correctAnswer: 'flex-wrap', hint: 'Use flex-wrap for wrapping', explanation: 'flex-wrap allows items to wrap onto multiple lines.', previewContent: '<div class="bg-blue-200 p-2 rounded">Item 1</div><div class="bg-green-200 p-2 rounded">Item 2</div><div class="bg-red-200 p-2 rounded">Item 3</div>', previewClasses: 'bg-gray-100 rounded p-4 flex gap-4' }
                ]
            },
            'CSS Grid': {
                challenges: [
                    { title: 'Grid Container', description: 'Make the container a grid using grid', correctAnswer: 'grid', hint: 'Use grid for grid container', explanation: 'grid enables grid layout.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4' },
                    { title: 'Grid Columns', description: 'Create two columns using grid-cols-2', correctAnswer: 'grid-cols-2', hint: 'Use grid-cols-2 for two columns', explanation: 'grid-cols-2 creates two columns.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 grid' },
                    { title: 'Grid Gap', description: 'Add gap between grid items using gap-4', correctAnswer: 'gap-4', hint: 'Use gap-4 for grid gap', explanation: 'gap-4 adds space between grid items.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 grid grid-cols-2' },
                    { title: 'Grid Row Span', description: 'Make an item span two rows using row-span-2', correctAnswer: 'row-span-2', hint: 'Use row-span-2 for row spanning', explanation: 'row-span-2 makes an item span two rows.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded row-span-2">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 grid grid-cols-2 gap-4' },
                    { title: 'Grid Column Start', description: 'Start an item at column 2 using col-start-2', correctAnswer: 'col-start-2', hint: 'Use col-start-2 for column start', explanation: 'col-start-2 starts an item at the second column.', previewContent: '<div class="bg-blue-200 p-2 m-1 rounded col-start-2">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 grid grid-cols-2 gap-4' }
                ]
            },
            'Responsive Design': {
                challenges: [
                    { title: 'Responsive Padding', description: 'Add responsive padding that changes on medium screens using md:p-6', correctAnswer: 'md:p-6', hint: 'Use md:p-6 for responsive padding', explanation: 'md:p-6 applies 1.5rem padding on medium screens and larger.', previewContent: 'Responsive box', previewClasses: 'bg-gray-200 text-gray-800 rounded' },
                    { title: 'Responsive Text Size', description: 'Make text responsive using text-sm md:text-lg', correctAnswer: 'text-sm md:text-lg', hint: 'Use text-sm md:text-lg for responsive text sizing', explanation: 'text-sm md:text-lg makes text small on mobile and large on medium screens.', previewContent: 'Responsive text', previewClasses: 'bg-gray-200 rounded p-4' },
                    { title: 'Responsive Grid', description: 'Create a responsive grid using grid grid-cols-1 md:grid-cols-2', correctAnswer: 'grid grid-cols-1 md:grid-cols-2', hint: 'Use grid grid-cols-1 md:grid-cols-2 for responsive grid', explanation: 'This creates a single column on mobile and two columns on medium screens.', previewContent: '<div class="bg-blue-200 p-2 rounded">Grid Item 1</div><div class="bg-green-200 p-2 rounded">Grid Item 2</div>', previewClasses: 'bg-gray-100 rounded p-4 gap-4' },
                    { title: 'Hide on Mobile', description: 'Hide an element on mobile using hidden md:block', correctAnswer: 'hidden md:block', hint: 'Use hidden md:block to hide on mobile', explanation: 'hidden md:block hides the element on mobile and shows on medium screens.', previewContent: 'Visible on md+', previewClasses: 'bg-gray-200 rounded p-4' },
                    { title: 'Show on Mobile', description: 'Show only on mobile using block md:hidden', correctAnswer: 'block md:hidden', hint: 'Use block md:hidden to show only on mobile', explanation: 'block md:hidden shows the element on mobile and hides on medium screens.', previewContent: 'Visible on mobile', previewClasses: 'bg-gray-200 rounded p-4' }
                ]
            },
            'Component Layouts': {
                challenges: [
                    { title: 'Card Layout', description: 'Create a card using rounded-lg shadow-lg p-6', correctAnswer: 'rounded-lg shadow-lg p-6', hint: 'Use rounded-lg shadow-lg p-6 for card', explanation: 'rounded-lg shadow-lg p-6 creates a card layout.', previewContent: 'Card content', previewClasses: 'bg-white' },
                    { title: 'Navbar Flex', description: 'Make a navbar using flex justify-between items-center', correctAnswer: 'flex justify-between items-center', hint: 'Use flex justify-between items-center for navbar', explanation: 'flex justify-between items-center creates a horizontal navbar.', previewContent: '<div class="bg-blue-200 p-2 rounded">Logo</div><div class="bg-green-200 p-2 rounded">Links</div>', previewClasses: 'bg-white flex justify-between items-center p-4' },
                    { title: 'Form Layout', description: 'Create a form layout using flex flex-col gap-4', correctAnswer: 'flex flex-col gap-4', hint: 'Use flex flex-col gap-4 for form', explanation: 'flex flex-col gap-4 creates a vertical form layout.', previewContent: '<input class="border p-2 rounded mb-2" placeholder="Input" /><button class="bg-blue-500 text-white p-2 rounded">Submit</button>', previewClasses: 'bg-white flex flex-col gap-4 p-4' },
                    { title: 'Grid Cards', description: 'Display cards in a grid using grid grid-cols-2 gap-4', correctAnswer: 'grid grid-cols-2 gap-4', hint: 'Use grid grid-cols-2 gap-4 for grid cards', explanation: 'grid grid-cols-2 gap-4 displays cards in a grid.', previewContent: '<div class="bg-blue-200 p-2 rounded">Card 1</div><div class="bg-green-200 p-2 rounded">Card 2</div>', previewClasses: 'bg-white grid grid-cols-2 gap-4 p-4' },
                    { title: 'Footer Center', description: 'Center footer content using flex justify-center', correctAnswer: 'flex justify-center', hint: 'Use flex justify-center for footer', explanation: 'flex justify-center centers the footer content.', previewContent: 'Footer', previewClasses: 'bg-white flex justify-center p-4' }
                ]
            }
        };
    }

    setupEventListeners() {
        // Navigation - check if elements exist
        const startLearningBtn = document.getElementById('startLearningBtn');
        const quickStartBtn = document.getElementById('quickStartBtn');
        const backToHomeBtn = document.getElementById('backToHomeBtn');
        
        if (startLearningBtn) startLearningBtn.addEventListener('click', () => this.startLearning());
        if (quickStartBtn) quickStartBtn.addEventListener('click', () => this.quickStart());
        if (backToHomeBtn) backToHomeBtn.addEventListener('click', () => this.showHomeScreen());

        // Topic Selection - only on home page
        const topicCards = document.querySelectorAll('.topic-card');
        if (topicCards.length > 0) {
            topicCards.forEach(card => {
                card.addEventListener('click', () => this.selectTopic(card));
            });
        }

        // Challenge Controls - only on game page
        const checkAnswerBtn = document.getElementById('checkAnswerBtn');
        const hintBtn = document.getElementById('hintBtn');
        const nextChallengeBtn = document.getElementById('nextChallengeBtn');
        
        if (checkAnswerBtn) checkAnswerBtn.addEventListener('click', () => this.checkAnswer());
        if (hintBtn) hintBtn.addEventListener('click', () => this.showHint());
        if (nextChallengeBtn) nextChallengeBtn.addEventListener('click', () => this.nextChallenge());

        // Code Input - only on game page
        const codeInput = document.getElementById('codeInput');
        if (codeInput) {
            codeInput.addEventListener('input', (e) => this.updatePreview(e.target.value));
            codeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.checkAnswer();
            });
        }

        // Chatbot - only on game page
        const sendChatBtn = document.getElementById('sendChatBtn');
        const chatInput = document.getElementById('chatInput');
        
        if (sendChatBtn) sendChatBtn.addEventListener('click', () => this.sendChatMessage());
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendChatMessage();
            });
        }
    }

    selectTopic(card) {
        // Remove selection from all cards
        document.querySelectorAll('.topic-card').forEach(c => {
            c.classList.remove('selected');
        });

        // Add selection to clicked card
        card.classList.add('selected');

        // Get the selected topic
        this.selectedTopic = card.getAttribute('data-topic');

        // Enable the start learning button
        const startBtn = document.getElementById('startLearningBtn');
        startBtn.disabled = false;
        startBtn.textContent = `🚀 Start Learning ${this.selectedTopic}`;
        startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    startLearning() {
        if (!this.selectedTopic) {
            alert('Please select a topic first!');
            return;
        }

        this.currentTopic = this.selectedTopic;
        this.currentChallengeIndex = 0;
        
        // Redirect to game page with topic parameter
        window.location.href = `game.html?topic=${encodeURIComponent(this.selectedTopic)}`;
    }

    quickStart() {
        this.selectedTopic = 'Spacing Basics';
        this.currentTopic = 'Spacing Basics';
        this.currentChallengeIndex = 0;
        
        // Redirect to game page with topic parameter
        window.location.href = `game.html?topic=Spacing%20Basics`;
    }

    showGameScreen() {
        // This will be handled by page navigation
        document.getElementById('homeScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        this.loadCurrentChallenge();
    }

    showHomeScreen() {
        // Redirect to home page with completion parameter
        window.location.href = `./topics.html?completed=true&topic=${encodeURIComponent(this.currentTopic)}`;
    }

    resetTopicSelection() {
        // Reset topic selection
        document.querySelectorAll('.topic-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        this.selectedTopic = null;
        
        // Disable and reset start button
        const startBtn = document.getElementById('startLearningBtn');
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.textContent = '🚀 Start Learning';
            startBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    loadCurrentChallenge() {
        const topic = this.currentTopic;
        const challenges = this.learningPath[topic].challenges;
        const challenge = challenges[this.currentChallengeIndex];

        document.getElementById('challengeTitle').textContent = challenge.title;
        document.getElementById('challengeDescription').textContent = challenge.description;
        document.getElementById('currentTopic').textContent = topic;
        document.getElementById('codeInput').value = '';
        
        this.updatePreview('');
        this.updateTargetPreview();
        this.updateUI();
    }

    updatePreview(inputValue) {
        const previewElement = document.getElementById('previewElement');
        const challenge = this.learningPath[this.currentTopic].challenges[this.currentChallengeIndex];
        
        // Combine the user's input with the base classes
        const allClasses = `${inputValue} ${challenge.previewClasses}`.trim();
        previewElement.className = allClasses;
        previewElement.innerHTML = challenge.previewContent;
    }

    updateTargetPreview() {
        const challenge = this.learningPath[this.currentTopic].challenges[this.currentChallengeIndex];
        const targetElement = document.getElementById('targetElement');
        
        if (targetElement) {
            // Apply the correct answer classes to the target element
            targetElement.className = `${challenge.correctAnswer} ${challenge.previewClasses}`.trim();
            targetElement.innerHTML = challenge.previewContent;
            
            // Update the hint with the target class
            const targetHint = document.getElementById('targetHint');
            if (targetHint) {
                targetHint.innerHTML = `Apply the class: <span class="font-mono text-quest-accent">${challenge.correctAnswer}</span>`;
                targetHint.classList.add('hidden');
            }
        }
    }

    checkAnswer() {
        const userInput = document.getElementById('codeInput').value.trim();
        const challenge = this.learningPath[this.currentTopic].challenges[this.currentChallengeIndex];
        
        if (userInput === challenge.correctAnswer) {
            this.handleCorrectAnswer(challenge);
        } else {
            this.handleIncorrectAnswer(challenge);
        }
    }

    handleCorrectAnswer(challenge) {
        this.score += 10;
        this.completedChallenges++;
        this.conceptsLearned++;
        
        // Update progress tracking
        this.progressTracker.completeChallenge(this.currentTopic);
        
        this.showSuccessMessage(challenge.explanation);
        document.getElementById('nextChallengeBtn').classList.remove('hidden');
        document.getElementById('checkAnswerBtn').classList.add('hidden');
        
        this.updateUI();
    }

    handleIncorrectAnswer(challenge) {
        this.showErrorMessage(`Try again! Hint: ${challenge.hint}`);
    }

    showSuccessMessage(explanation) {
        // Visual feedback
        const codeInput = document.getElementById('codeInput');
        codeInput.style.border = '2px solid #10B981';
        codeInput.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        
        setTimeout(() => {
            codeInput.style.border = '';
            codeInput.style.backgroundColor = '';
        }, 2000);
    }

    showErrorMessage(message) {
        // Visual feedback
        const codeInput = document.getElementById('codeInput');
        codeInput.style.border = '2px solid #EF4444';
        codeInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        
        setTimeout(() => {
            codeInput.style.border = '';
            codeInput.style.backgroundColor = '';
        }, 2000);
    }

    showHint() {
        const challenge = this.learningPath[this.currentTopic].challenges[this.currentChallengeIndex];
        const hintArea = document.getElementById('targetHint');
        hintArea.classList.remove('hidden');
    }

    nextChallenge() {
        const topic = this.currentTopic;
        const challenges = this.learningPath[topic].challenges;
        
        this.currentChallengeIndex++;
        
        if (this.currentChallengeIndex >= challenges.length) {
            // Topic completed - show completion message
            this.showTopicCompleted();
        } else {
            // Next challenge in same topic
            this.loadCurrentChallenge();
        }
        
        document.getElementById('nextChallengeBtn').classList.add('hidden');
        document.getElementById('checkAnswerBtn').classList.remove('hidden');
    }

    showTopicCompleted() {
        const learningArea = document.getElementById('learningArea');
        const topicProgress = this.progressTracker.getTopicProgress(this.currentTopic);
        
        learningArea.innerHTML = `
            <div class="text-center">
                <h3 class="text-3xl font-bold mb-4">🎉 Topic Completed!</h3>
                <p class="text-xl text-gray-300 mb-6">You've mastered ${this.currentTopic}!</p>
                <div class="bg-quest-primary/20 rounded-lg p-6 mb-6">
                    <h4 class="text-xl font-bold mb-4">Topic Stats:</h4>
                    <div class="grid grid-cols-2 gap-4 text-left">
                        <div>Score: <span class="font-bold text-quest-accent">${this.score}</span></div>
                        <div>Challenges: <span class="font-bold text-quest-secondary">${this.completedChallenges}</span></div>
                        <div>Concepts: <span class="font-bold text-quest-primary">${this.conceptsLearned}</span></div>
                        <div>Level: <span class="font-bold text-purple-400">${this.currentLevel}</span></div>
                        <div>Progress: <span class="font-bold text-quest-accent">${topicProgress.completed}/${topicProgress.total}</span></div>
                    </div>
                </div>
                <div class="flex justify-center space-x-4">
                    <button id="playAgainBtn" class="bg-quest-secondary hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Play Again
                    </button>
                    <button id="chooseTopicBtn" class="bg-quest-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Choose Another Topic
                    </button>
                </div>
            </div>
        `;

        // Add event listeners to the new buttons
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.currentChallengeIndex = 0;
            this.loadCurrentChallenge();
            document.getElementById('nextChallengeBtn').classList.add('hidden');
            document.getElementById('checkAnswerBtn').classList.remove('hidden');
        });

        document.getElementById('chooseTopicBtn').addEventListener('click', () => {
            this.showHomeScreen();
        });
    }

    updateUI() {
        // Update home screen stats
        const levelElement = document.getElementById('level');
        const scoreElement = document.getElementById('score');
        const conceptsElement = document.getElementById('concepts');
        
        if (levelElement) levelElement.textContent = this.currentLevel;
        if (scoreElement) scoreElement.textContent = this.score;
        if (conceptsElement) conceptsElement.textContent = this.conceptsLearned;
        
        // Update game screen stats
        const gameLevelElement = document.getElementById('gameLevel');
        const gameScoreElement = document.getElementById('gameScore');
        const completedChallengesElement = document.getElementById('completedChallenges');
        const conceptsLearnedElement = document.getElementById('conceptsLearned');
        
        if (gameLevelElement) gameLevelElement.textContent = this.currentLevel;
        if (gameScoreElement) gameScoreElement.textContent = this.score;
        if (completedChallengesElement) completedChallengesElement.textContent = this.completedChallenges;
        if (conceptsLearnedElement) conceptsLearnedElement.textContent = this.conceptsLearned;
        
    // Calculate progress for current topic using ProgressTracker
    const topicProgress = this.progressTracker.getTopicProgress(this.currentTopic);
    const progress = topicProgress.total > 0 ? Math.round((topicProgress.completed / topicProgress.total) * 100) : 0;
    const progressElement = document.getElementById('progress');
    const overallProgressElement = document.getElementById('overallProgress');
    const progressBar = document.getElementById('progressBar');
    if (progressElement) progressElement.textContent = progress + '%';
    if (overallProgressElement) overallProgressElement.textContent = progress + '%';
    if (progressBar) progressBar.style.width = progress + '%';
        
        // Calculate accuracy (simplified)
        const accuracy = this.completedChallenges > 0 ? Math.round((this.completedChallenges / (this.completedChallenges + 2)) * 100) : 0;
        const accuracyElement = document.getElementById('accuracy');
        if (accuracyElement) accuracyElement.textContent = accuracy + '%';
    }
}

// Tutorial Manager Class
class TutorialManager {
    constructor(game) {
        this.game = game;
        this.currentStep = 0;

        // Steps for tutorial
        this.steps = [
            {
                title: "Welcome to Tailwind Quest!",
                text: "In this game, you'll learn Tailwind CSS by completing coding challenges.",
                highlight: null
            },
            {
                title: "Before We Start",
                text: "We recommend you have a basic understanding of HTML and CSS. If you're new, consider checking out our blog post on getting started with those topics.",
                highlight: null
            },
            {
                title: "Code Editor",
                text: "Here's where you type Tailwind classes. Try applying the correct ones to solve challenges.",
                highlight: "#codeEditor"
            },
            {
                title: "Target Area",
                text: "This shows what your code should look like once styled correctly.",
                highlight: "#targetPreview"
            },
            {
                title: "Live Preview",
                text: "As you type in the editor, your work will be rendered here in real time.",
                highlight: "#previewContainer"
            },
            {
                title: "Progress Bar",
                text: "Track your learning progress in the following topic here.",
                highlight: "#overallProgressSection"
            },
            {
                title: "Achievements",
                text: "Earn badges like 'Speedrunner' or 'Perfect Score' for extra challenges!",
                highlight: "#achievementsContainer"
            },
            {
                title: "You're Ready!",
                text: "That's it! Time to start learning Tailwind. Good luck!",
                highlight: null
            }
        ];

        this.overlay = document.getElementById("tutorialOverlay");
        this.title = document.getElementById("tutorialTitle");
        this.text = document.getElementById("tutorialText");
        this.nextBtn = document.getElementById("tutorialNext");
        this.prevBtn = document.getElementById("tutorialPrev");
        this.skipBtn = document.getElementById("tutorialSkip");
        this.currentStepEl = document.getElementById("tutorialCurrentStep");
        this.totalStepsEl = document.getElementById("tutorialTotalSteps");

        if (this.overlay && this.nextBtn && this.skipBtn) {
            this.nextBtn.addEventListener("click", () => this.nextStep());
            this.prevBtn.addEventListener("click", () => this.prevStep());
            this.skipBtn.addEventListener("click", () => this.endTutorial());
        }
        
        // Set total steps
        if (this.totalStepsEl) {
            this.totalStepsEl.textContent = this.steps.length;
        }
    }

    start() {
        this.currentStep = 0;
        this.showStep();
        this.overlay.classList.remove("hidden");
    }

    showStep() {
        const step = this.steps[this.currentStep];
        if (!step) return this.endTutorial();

        this.title.textContent = step.title;
        this.text.textContent = step.text;
        
        // Update step counter
        if (this.currentStepEl) {
            this.currentStepEl.textContent = this.currentStep + 1;
        }
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentStep === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.textContent = this.currentStep === this.steps.length - 1 ? "Finish" : "Next";
        }

        // Remove previous highlight
        document.querySelectorAll(".tutorial-highlight").forEach(el => {
            el.classList.remove("ring-4", "ring-yellow-400", "ring-offset-2", "tutorial-highlight");
        });

        // Highlight new element if exists
        if (step.highlight) {
            const el = document.querySelector(step.highlight);
            if (el) {
                el.classList.add("ring-4", "ring-yellow-400", "ring-offset-2", "tutorial-highlight");
                
                // Scroll to the element
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                });
            }
        }
    }

    nextStep() {
        this.currentStep++;
        if (this.currentStep >= this.steps.length) {
            this.endTutorial();
        } else {
            this.showStep();
        }
    }
    
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }

    endTutorial() {
        this.overlay.classList.add("hidden");
        // Remove highlight if any left
        document.querySelectorAll(".tutorial-highlight").forEach(el => {
            el.classList.remove("ring-4", "ring-yellow-400", "ring-offset-2", "tutorial-highlight");
        });
    }
}

// Add these styles to your CSS for the tutorial navigation
const tutorialStyles = `
.tutorial-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
}

.tutorial-step-counter {
    color: #9CA3AF;
    font-size: 0.875rem;
}

#tutorialPrev:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = tutorialStyles;
document.head.appendChild(styleSheet);

// Initialize tutorial when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Your existing game initialization
    window.game = new TailwindLearningGame();
    
    // Initialize tutorial
    window.tutorial = new TutorialManager(window.game);

    // Show tutorial if overall progress = 0% and not shown this session
    const progressTracker = window.game.progressTracker;
    const overallProgress = progressTracker.getOverallProgress();

    if (overallProgress === 0 && !sessionStorage.getItem("tutorialShown")) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
            window.tutorial.start();
            sessionStorage.setItem("tutorialShown", "true");
        }, 500);
    }
    
    // Add click event to tutorial button if you have one
    const tutorialBtn = document.getElementById('tutorialBtn');
    if (tutorialBtn) {
        tutorialBtn.addEventListener('click', () => {
            window.tutorial.start();
        });
    }
});