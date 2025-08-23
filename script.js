// Enhanced notification system with Tailwind classes
function showNotification(title, message, type = 'success', duration = 5000) {
    const notification = document.createElement('div');
    
    // Base Tailwind classes for notification
    let baseClasses = 'fixed top-5 right-5 max-w-sm w-full bg-white rounded-lg shadow-2xl border border-gray-200 transform translate-x-full transition-all duration-500 ease-out backdrop-blur-sm z-50';
    let typeClasses = '';
    let icon = '';
    
    switch (type) {
        case 'success':
            typeClasses = 'border-l-4 border-l-green-500';
            icon = `<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>`;
            break;
        case 'error':
            typeClasses = 'border-l-4 border-l-red-500';
            icon = `<div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </div>`;
            break;
        case 'warning':
            typeClasses = 'border-l-4 border-l-yellow-500';
            icon = `<div class="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
            </div>`;
            break;
        default:
            typeClasses = 'border-l-4 border-l-blue-500';
            icon = `<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
            </div>`;
    }
    
    notification.className = `${baseClasses} ${typeClasses}`;
    notification.innerHTML = `
        <div class="p-4">
            <div class="flex items-start">
                ${icon}
                <div class="ml-3 flex-1">
                    <h3 class="text-sm font-semibold text-gray-900">${title}</h3>
                    <p class="mt-1 text-sm text-gray-600">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="mt-3 bg-gray-200 rounded-full h-1 overflow-hidden">
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full progress-bar"></div>
            </div>
        </div>
    `;
    
    document.getElementById('notification-container').appendChild(notification);
    
    // Show notification with slide-in effect
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('slide-in-bounce');
    }, 100);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, duration);
}

// Enhanced modal system
function showModal(title, message, type = 'info', buttons = []) {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    
    let iconHtml = '';
    let colorClasses = '';
    
    switch (type) {
        case 'success':
            colorClasses = 'text-green-600 bg-green-100';
            iconHtml = `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>`;
            break;
        case 'error':
            colorClasses = 'text-red-600 bg-red-100';
            iconHtml = `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>`;
            break;
        case 'warning':
            colorClasses = 'text-yellow-600 bg-yellow-100';
            iconHtml = `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>`;
            break;
        default:
            colorClasses = 'text-blue-600 bg-blue-100';
            iconHtml = `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>`;
    }
    
    content.innerHTML = `
        <div class="text-center">
            <div class="mx-auto flex items-center justify-center w-12 h-12 rounded-full ${colorClasses} mb-4">
                ${iconHtml}
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${title}</h3>
            <p class="text-gray-600 mb-6">${message}</p>
            <div class="flex justify-center space-x-3">
                ${buttons.length > 0 ? buttons.map(btn => `
                    <button onclick="${btn.onclick || 'closeModal()'}" 
                            class="${btn.class || 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'}">
                        ${btn.text}
                    </button>
                `).join('') : `
                    <button onclick="closeModal()" 
                            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                        OK
                    </button>
                `}
            </div>
        </div>
    `;
    
    // Show modal with animation
    overlay.classList.remove('opacity-0', 'invisible');
    modal.classList.remove('scale-90', '-translate-y-5');
    modal.classList.add('scale-100', 'translate-y-0');
}

// Close modal function
function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    
    modal.classList.remove('scale-100', 'translate-y-0');
    modal.classList.add('scale-90', '-translate-y-5');
    overlay.classList.add('opacity-0');
    
    setTimeout(() => {
        overlay.classList.add('invisible');
    }, 300);
}

// Close modal when clicking overlay
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + '-error');
    
    field.classList.add('border-red-500', 'shake');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    
    setTimeout(() => {
        field.classList.remove('shake');
    }, 500);
}

function hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + '-error');
    
    field.classList.remove('border-red-500');
    errorDiv.classList.add('hidden');
}

function validateForm() {
    let isValid = true;
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset all errors
    ['firstName', 'email', 'mobile', 'message'].forEach(field => {
        hideFieldError(field);
    });
    
    // Validate first name
    if (!firstName) {
        showFieldError('firstName', 'First name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate mobile (optional but if provided, should be valid)
    if (mobile && !validatePhone(mobile)) {
        showFieldError('mobile', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showFieldError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError('message', 'Message should be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            
            // Show success notification
            showNotification(
                'Message Sent!', 
                'Thank you for your message. We\'ll get back to you soon!', 
                'success'
            );
            
            // Show success modal with custom buttons
            showModal(
                'Thank You!',
                'Your message has been sent successfully. We will get back to you within 24 hours.',
                'success',
                [
                    {
                        text: 'Send Another Message',
                        class: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200',
                        onclick: 'closeModal()'
                    },
                    {
                        text: 'Go to Home',
                        class: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200',
                        onclick: 'window.location.href = "./index.html"'
                    }
                ]
            );
            
            // Reset form
            this.reset();
            
        }, 2000); // Simulate 2 second delay
    } else {
        showNotification(
            'Validation Error', 
            'Please correct the errors in the form and try again.', 
            'error'
        );
    }
});

// Real-time validation
document.getElementById('firstName').addEventListener('input', function() {
    if (this.value.trim()) {
        hideFieldError('firstName');
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim() && validateEmail(this.value.trim())) {
        hideFieldError('email');
    }
});

document.getElementById('mobile').addEventListener('input', function() {
    if (!this.value.trim() || validatePhone(this.value.trim())) {
        hideFieldError('mobile');
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim().length >= 10) {
        hideFieldError('message');
    }
});


// --- GAME INTERFACE ENHANCEMENTS ---
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startLearningBtn = document.getElementById('startLearningBtn');
    const topicCards = document.querySelectorAll('.topic-card');
    const gameTypeModal = document.getElementById('gameTypeModal');
    const closeGameTypeModal = document.getElementById('closeGameTypeModal');
    const miniGameContainer = document.getElementById('miniGameContainer');
    const closeMiniGame = document.getElementById('closeMiniGame');
    const miniGameContent = document.getElementById('miniGameContent');
    const miniGamePreview = document.getElementById('miniGamePreview');
    const miniGameChatInput = document.getElementById('miniGameChatInput');
    const miniGameChatSend = document.getElementById('miniGameChatSend');
    const miniGameChatResponse = document.getElementById('miniGameChatResponse');
    let selectedTopic = null;



    // Enable Start Learning when a topic is selected, and update cursor
    topicCards.forEach(card => {
        card.addEventListener('click', function(e) {
            topicCards.forEach(c => c.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            selectedTopic = e.currentTarget.getAttribute('data-topic');
            // Debugging: show border and log
            e.currentTarget.style.outline = '3px solid #F59E0B';
            setTimeout(() => { e.currentTarget.style.outline = ''; }, 500);
            console.log('Card selected:', selectedTopic);
            if (startLearningBtn) {
                startLearningBtn.disabled = false;
                startLearningBtn.style.cursor = 'pointer';
            }
        });
    });

    // Set initial cursor style for disabled button
    if (startLearningBtn) {
        startLearningBtn.style.cursor = 'not-allowed';
    }

    // Show game type modal on Start Learning
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            if (!selectedTopic) return;
            gameTypeModal.classList.remove('hidden');
        });
    }

    // Close game type modal
    if (closeGameTypeModal) {
        closeGameTypeModal.addEventListener('click', function() {
            gameTypeModal.classList.add('hidden');
        });
    }

    // Handle game type selection
    gameTypeModal.querySelectorAll('button[data-gametype]').forEach(btn => {
        btn.addEventListener('click', function() {
            const gameType = this.getAttribute('data-gametype');
            gameTypeModal.classList.add('hidden');
            showMiniGame(gameType, selectedTopic);
        });
    });

    // Show mini-game container
    function showMiniGame(gameType, topic) {
        miniGameContainer.classList.remove('hidden');
        miniGameChatResponse.textContent = '';
        miniGameChatInput.value = '';
        // Placeholder content for each game type
        let html = '';
        if (gameType === 'quiz') {
            html = `<h3 class='text-xl font-bold mb-2'>Quiz: ${topic}</h3><p>Answer a question about <b>${topic}</b>!</p>`;
            miniGamePreview.innerHTML = '<div class="p-4 bg-blue-100 rounded">Quiz preview here</div>';
        } else if (gameType === 'color') {
            html = `<h3 class='text-xl font-bold mb-2'>Color Match: ${topic}</h3><p>Match the color using Tailwind classes!</p>`;
            miniGamePreview.innerHTML = '<div class="w-16 h-16 rounded-full mx-auto" style="background: #3B82F6"></div>';
        } else if (gameType === 'shape') {
            html = `<h3 class='text-xl font-bold mb-2'>Shape Builder: ${topic}</h3><p>Build the correct shape using Tailwind classes!</p>`;
            miniGamePreview.innerHTML = '<div class="w-16 h-16 bg-quest-accent rounded-full mx-auto"></div>';
        } else if (gameType === 'task') {
            html = `<h3 class='text-xl font-bold mb-2'>Mini Task: ${topic}</h3><p>Complete a small challenge related to <b>${topic}</b>.</p>`;
            miniGamePreview.innerHTML = '<div class="p-4 bg-green-100 rounded">Task preview here</div>';
        }
        miniGameContent.innerHTML = html;
    }

    // Close mini-game
    if (closeMiniGame) {
        closeMiniGame.addEventListener('click', function() {
            miniGameContainer.classList.add('hidden');
        });
    }

    // Chatbot integration for mini-game
    if (miniGameChatSend) {
        miniGameChatSend.addEventListener('click', function() {
            const userMsg = miniGameChatInput.value.trim();
            if (!userMsg) return;
            miniGameChatResponse.textContent = 'Thinking...';
            fetch('https://joyr13384.app.n8n.cloud/webhook-test/98594f76-a4df-4e7c-a9f7-85167da4528a', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, topic: selectedTopic })
            })
            .then(res => res.text())
            .then(text => {
                // If response contains <iframe ...>, strip it and show only the inner content as plain text
                let reply = text;
                const iframeMatch = text.match(/<iframe[^>]*srcdoc="([^"]+)"[^>]*>/);
                if (iframeMatch) {
                    // Decode HTML entities in srcdoc
                    let srcdoc = iframeMatch[1]
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&amp;/g, '&');
                    // Remove any <script> tags for safety
                    srcdoc = srcdoc.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
                    // Remove <iframe> if present in srcdoc
                    srcdoc = srcdoc.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '');
                    // Remove style attributes for safety
                    srcdoc = srcdoc.replace(/style="[^"]*"/gi, '');
                    // Remove sandbox and allow attributes
                    srcdoc = srcdoc.replace(/\s(sandbox|allow|allowtransparency|allowfullscreen|frameborder|scrolling|marginwidth|marginheight|width|height|srcdoc|src|name|id|title|tabindex|aria-[a-z-]+)="[^"]*"/gi, '');
                    // Remove outer HTML/body if present
                    srcdoc = srcdoc.replace(/<\/?(html|body)[^>]*>/gi, '');
                    reply = srcdoc.trim();
                }
                // Remove any remaining <iframe> tags
                reply = reply.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '');
                // Optionally, strip all HTML tags except <b>, <i>, <code>, <pre>
                reply = reply.replace(/<(?!\/?(b|i|code|pre|br)\b)[^>]+>/gi, '');
                // Replace <br> with newlines for better readability
                reply = reply.replace(/<br\s*\/?>/gi, '\n');
                miniGameChatResponse.textContent = '';
                // If code/pre block, render as code
                if (/<pre>|<code>/.test(reply)) {
                    miniGameChatResponse.innerHTML = reply;
                } else {
                    // Escape HTML for plain text
                    miniGameChatResponse.textContent = reply;
                }
            })
            .catch(() => {
                miniGameChatResponse.textContent = 'Sorry, there was a problem getting a response.';
            });
        });
    }

    // Enter key for chat
    if (miniGameChatInput) {
        miniGameChatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') miniGameChatSend.click();
        });
    }

    // Escape closes modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!gameTypeModal.classList.contains('hidden')) gameTypeModal.classList.add('hidden');
            if (!miniGameContainer.classList.contains('hidden')) miniGameContainer.classList.add('hidden');
            closeModal();
        }
    });
});