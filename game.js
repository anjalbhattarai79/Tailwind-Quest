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
                    {
                        title: 'Add Padding',
                        description: 'Add padding to the box using the p-4 class',
                        correctAnswer: 'p-4',
                        hint: 'Use p-4 for padding on all sides',
                        explanation: 'p-4 adds 1rem (16px) of padding to all sides of the element.',
                        previewContent: 'Box content',
                        previewClasses: 'bg-gray-200 text-gray-800 rounded'
                    },
                    {
                        title: 'Add Margin',
                        description: 'Add margin to the box using the m-2 class',
                        correctAnswer: 'm-2',
                        hint: 'Use m-2 for margin on all sides',
                        explanation: 'm-2 adds 0.5rem (8px) of margin to all sides of the element.',
                        previewContent: 'Box content',
                        previewClasses: 'bg-gray-200 text-gray-800 rounded'
                    },
                    {
                        title: 'Add Top Padding',
                        description: 'Add padding only to the top using pt-6',
                        correctAnswer: 'pt-6',
                        hint: 'Use pt-6 for top padding only',
                        explanation: 'pt-6 adds 1.5rem (24px) of padding to the top of the element.',
                        previewContent: 'Box content',
                        previewClasses: 'bg-gray-200 text-gray-800 rounded'
                    }
                ]
            },
            'Colors & Backgrounds': {
                challenges: [
                    {
                        title: 'Change Background Color',
                        description: 'Change the background color to blue using bg-blue-500',
                        correctAnswer: 'bg-blue-500',
                        hint: 'Use bg-blue-500 for a blue background',
                        explanation: 'bg-blue-500 applies a medium blue background color.',
                        previewContent: 'Colored box',
                        previewClasses: 'text-white rounded p-4'
                    },
                    {
                        title: 'Change Text Color',
                        description: 'Change the text color to red using text-red-600',
                        correctAnswer: 'text-red-600',
                        hint: 'Use text-red-600 for red text',
                        explanation: 'text-red-600 applies a medium red color to the text.',
                        previewContent: 'Red text',
                        previewClasses: 'bg-white rounded p-4'
                    },
                    {
                        title: 'Add Border Color',
                        description: 'Add a green border using border-green-400',
                        correctAnswer: 'border-green-400',
                        hint: 'Use border-green-400 for a green border',
                        explanation: 'border-green-400 adds a light green border to the element.',
                        previewContent: 'Bordered box',
                        previewClasses: 'bg-white rounded p-4 border-2'
                    }
                ]
            },
            'Layout & Flexbox': {
                challenges: [
                    {
                        title: 'Make Flex Container',
                        description: 'Make this a flex container using flex',
                        correctAnswer: 'flex',
                        hint: 'Use flex to create a flexbox container',
                        explanation: 'flex makes the element a flex container, allowing flexible layout of its children.',
                        previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>',
                        previewClasses: 'bg-gray-100 rounded p-4'
                    },
                    {
                        title: 'Center Items',
                        description: 'Center the flex items using justify-center',
                        correctAnswer: 'justify-center',
                        hint: 'Use justify-center to center items horizontally',
                        explanation: 'justify-center centers the flex items along the main axis.',
                        previewContent: '<div class="bg-blue-200 p-2 m-1 rounded">Item 1</div><div class="bg-green-200 p-2 m-1 rounded">Item 2</div>',
                        previewClasses: 'bg-gray-100 rounded p-4 flex'
                    },
                    {
                        title: 'Add Gap',
                        description: 'Add space between items using gap-4',
                        correctAnswer: 'gap-4',
                        hint: 'Use gap-4 to add space between flex items',
                        explanation: 'gap-4 adds 1rem (16px) of space between flex items.',
                        previewContent: '<div class="bg-blue-200 p-2 rounded">Item 1</div><div class="bg-green-200 p-2 rounded">Item 2</div>',
                        previewClasses: 'bg-gray-100 rounded p-4 flex'
                    }
                ]
            },
            'Responsive Design': {
                challenges: [
                    {
                        title: 'Responsive Padding',
                        description: 'Add responsive padding that changes on medium screens using md:p-6',
                        correctAnswer: 'md:p-6',
                        hint: 'Use md:p-6 for responsive padding',
                        explanation: 'md:p-6 applies 1.5rem padding on medium screens and larger.',
                        previewContent: 'Responsive box',
                        previewClasses: 'bg-gray-200 text-gray-800 rounded'
                    },
                    {
                        title: 'Responsive Text Size',
                        description: 'Make text responsive using text-sm md:text-lg',
                        correctAnswer: 'text-sm md:text-lg',
                        hint: 'Use text-sm md:text-lg for responsive text sizing',
                        explanation: 'text-sm md:text-lg makes text small on mobile and large on medium screens.',
                        previewContent: 'Responsive text',
                        previewClasses: 'bg-gray-200 rounded p-4'
                    },
                    {
                        title: 'Responsive Grid',
                        description: 'Create a responsive grid using grid grid-cols-1 md:grid-cols-2',
                        correctAnswer: 'grid grid-cols-1 md:grid-cols-2',
                        hint: 'Use grid grid-cols-1 md:grid-cols-2 for responsive grid',
                        explanation: 'This creates a single column on mobile and two columns on medium screens.',
                        previewContent: '<div class="bg-blue-200 p-2 rounded">Grid Item 1</div><div class="bg-green-200 p-2 rounded">Grid Item 2</div>',
                        previewClasses: 'bg-gray-100 rounded p-4 gap-4'
                    }
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
        // Redirect to home page
        window.location.href = 'index.html';
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
        alert(`💡 Hint: ${challenge.hint}`);
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
        
        // Calculate progress for current topic
        const topicChallenges = this.learningPath[this.currentTopic].challenges.length;
        const progress = Math.round((this.currentChallengeIndex / topicChallenges) * 100);
        
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

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new TailwindLearningGame();
});