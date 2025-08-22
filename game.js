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
    }
}
