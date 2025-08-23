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
                this.setupEventListeners();
                this.updateUI();
                this.loadCurrentChallenge();
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
                    }
                };
            }

            setupEventListeners() {
                // Challenge Controls
                document.getElementById('checkAnswerBtn').addEventListener('click', () => this.checkAnswer());
                document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
                document.getElementById('nextChallengeBtn').addEventListener('click', () => this.nextChallenge());
                document.getElementById('backToHomeBtn').addEventListener('click', () => this.showHomeScreen());

                // Code Input
                document.getElementById('codeInput').addEventListener('input', (e) => this.updatePreview(e.target.value));
                document.getElementById('codeInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.checkAnswer();
                });
            }

            
            showHomeScreen() {
                window.location = "./index.html";
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
                
                // Apply the correct answer classes to the target element
                targetElement.className = `${challenge.correctAnswer} ${challenge.previewClasses}`.trim();
                targetElement.innerHTML = challenge.previewContent;
                
                // Update the hint with the target class
                const targetHint = document.getElementById('targetHint');
                targetHint.innerHTML = `Apply the class: <span class="font-mono text-quest-accent">${challenge.correctAnswer}</span>`;
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
                        <button onclick="location.reload()" class="bg-quest-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            Play Again
                        </button>
                    </div>
                `;
            }

            updateUI() {
                document.getElementById('level').textContent = this.currentLevel;
                document.getElementById('score').textContent = this.score;
                document.getElementById('concepts').textContent = this.conceptsLearned;
                document.getElementById('gameLevel').textContent = this.currentLevel;
                document.getElementById('gameScore').textContent = this.score;
                document.getElementById('completedChallenges').textContent = this.completedChallenges;
                document.getElementById('conceptsLearned').textContent = this.conceptsLearned;
                
                // Calculate progress for current topic
                const topicChallenges = this.learningPath[this.currentTopic].challenges.length;
                const progress = Math.round((this.currentChallengeIndex / topicChallenges) * 100);
                
                document.getElementById('progress').textContent = progress + '%';
                document.getElementById('overallProgress').textContent = progress + '%';
                document.getElementById('progressBar').style.width = progress + '%';
                
                // Calculate accuracy (simplified)
                const accuracy = this.completedChallenges > 0 ? Math.round((this.completedChallenges / (this.completedChallenges + 2)) * 100) : 0;
                document.getElementById('accuracy').textContent = accuracy + '%';
            }
        }

        // Initialize the game when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            const game = new TailwindLearningGame();
            
            // Make the game globally accessible for debugging
            window.game = game;
        });