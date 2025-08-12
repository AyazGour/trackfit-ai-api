// TrackFit AI - Main Application JavaScript with Firebase Integration

// AI Exercise Tracker Class
class ExerciseTracker {
    constructor() {
        this.video = null;
        this.canvas = null;
        this.ctx = null;
        this.isTracking = false;
        this.currentExercise = null;
        this.apiBaseUrl = (window.AI_API_BASE_URL || 'http://127.0.0.1:5000') + '/api';
        this.stats = {
            reps: 0,
            stage: null,
            angle: 0
        };
        this.sessionStartTime = null;
    }

    // Initialize camera and canvas
    async initCamera() {
        try {
            this.video = document.getElementById('exerciseVideo');
            this.canvas = document.getElementById('exerciseCanvas');
            this.ctx = this.canvas.getContext('2d');

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user' 
                }
            });

            this.video.srcObject = stream;
            this.video.play();

            return true;
        } catch (error) {
            console.error('Error accessing camera:', error);
            return false;
        }
    }

    // Start tracking specific exercise
    async startExercise(exerciseType) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/start-exercise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exercise_type: exerciseType })
            });

            if (!response.ok) {
                throw new Error('Failed to start exercise tracking');
            }

            const result = await response.json();
            this.currentExercise = exerciseType;
            this.isTracking = true;
            this.sessionStartTime = Date.now();
            this.startFrameProcessing();

            return result;
        } catch (error) {
            console.error('Error starting exercise:', error);
            throw error;
        }
    }

    // Process video frames
    startFrameProcessing() {
        const processFrame = async () => {
            if (!this.isTracking || !this.video) return;

            // Draw video frame to canvas
            this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

            // Convert canvas to base64 image
            const imageData = this.canvas.toDataURL('image/jpeg', 0.8);

            try {
                // Send frame to Python API
                const response = await fetch(`${this.apiBaseUrl}/process-frame`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: imageData })
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    if (result.success && result.data) {
                        this.updateStats(result.data);
                        this.updateUI(result.data);
                    }
                }
            } catch (error) {
                console.error('Error processing frame:', error);
            }

            // Continue processing
            if (this.isTracking) {
                requestAnimationFrame(processFrame);
            }
        };

        processFrame();
    }

    // Update exercise stats
    updateStats(data) {
        const oldReps = this.stats.reps;
        this.stats = {
            reps: data.reps,
            stage: data.stage,
            angle: data.angle
        };
        
        // Trigger celebration if reps increased
        if (data.reps > oldReps) {
            this.triggerRepCelebration();
        }
    }

    // Update UI with exercise data
    updateUI(data) {
        // Update rep counter
        const repCounter = document.getElementById('repCounter');
        if (repCounter) {
            repCounter.textContent = data.reps;
        }

        // Update stage indicator
        const stageIndicator = document.getElementById('stageIndicator');
        if (stageIndicator) {
            stageIndicator.textContent = data.stage || 'Ready';
            stageIndicator.className = `stat-value stage-indicator ${data.stage || 'ready'}`;
        }

        // Update angle display
        const angleDisplay = document.getElementById('angleDisplay');
        if (angleDisplay) {
            angleDisplay.textContent = `${data.angle}°`;
        }
    }

    // Trigger celebration animation for completed rep
    triggerRepCelebration() {
        const celebration = document.getElementById('repCelebration');
        if (celebration) {
            celebration.classList.add('animate');
            setTimeout(() => {
                celebration.classList.remove('animate');
            }, 1000);
        }

        // Add haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    }

    // Stop tracking
    async stopExercise() {
        this.isTracking = false;
        this.currentExercise = null;

        if (this.video && this.video.srcObject) {
            const tracks = this.video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }

        return this.stats;
    }

    // Reset rep counter
    async resetCounter() {
        try {
            await fetch(`${this.apiBaseUrl}/reset-counter`, {
                method: 'POST'
            });
            
            this.stats.reps = 0;
            this.updateUI(this.stats);
        } catch (error) {
            console.error('Error resetting counter:', error);
        }
    }

    // Calculate estimated calories burned
    calculateCalories() {
        const caloriesPerRep = {
            arms: 0.5,
            biceps: 0.5,
            triceps: 0.5,
            chest: 0.7,
            back: 0.6,
            shoulders: 0.5,
            abs: 0.3,
            legs: 0.8,
            glutes: 0.9,
            calves: 0.4
        };

        return Math.round(this.stats.reps * (caloriesPerRep[this.currentExercise] || 0.5));
    }

    // Get session duration
    getSessionDuration() {
        if (!this.sessionStartTime) return 0;
        return Math.floor((Date.now() - this.sessionStartTime) / 1000);
    }
}

class TrackFitApp {
    constructor() {
        this.currentUser = null;
        this.currentDifficulty = 'beginner';
        this.cart = [];
        this.cartCount = 0;
        this.isMobile = this.detectMobile();
        this.exerciseTracker = new ExerciseTracker();
        this.aiTrackingEnabled = false;
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Wait for Firebase to be ready
        await this.waitForFirebase();
    }

    // Wait for Firebase to be available
    async waitForFirebase() {
        console.log('Waiting for Firebase...');
        while (!window.firebase) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        console.log('Firebase loaded successfully');
        this.firebase = window.firebase;
        this.initializeApp();
        this.setupAuthListener();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }

    addHapticFeedback() {
        if (this.isMobile && navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    setupAuthListener() {
        // Listen for authentication state changes
        this.firebase.onAuthStateChanged(this.firebase.auth, (user) => {
            if (user) {
                this.currentUser = user;
                this.loadUserProfile(user.uid);
                this.showMainApp();
            } else {
                this.currentUser = null;
                this.showLandingPage();
            }
        });
    }

    async loadUserProfile(uid) {
        try {
            const userDoc = await this.firebase.getDoc(this.firebase.doc(this.firebase.db, 'users', uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('User profile loaded:', userData);
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    initializeApp() {
        console.log('Initializing app...');
        this.setupEventListeners();
        this.displayProducts();
        this.displayTrainers();
        console.log('App initialized successfully');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Landing page
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                console.log('Get Started button clicked');
                this.showAuthModal();
            });
            console.log('Get Started button event listener added');
        } else {
            console.error('Get Started button not found!');
        }

        // Authentication modal
        const closeAuthModal = document.getElementById('closeAuthModal');
        if (closeAuthModal) {
            closeAuthModal.addEventListener('click', () => {
                this.hideAuthModal();
            });
        }

        document.getElementById('showRegister').addEventListener('click', () => {
            this.showRegisterForm();
        });

        document.getElementById('showLogin').addEventListener('click', () => {
            this.showLoginForm();
        });

        // Authentication forms
        document.querySelector('#loginForm form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.querySelector('#registerForm form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Exercise difficulty selector
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setDifficulty(e.target.dataset.level);
            });
        });

        // Exercise categories
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                
                // Remove active class from all cards
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                e.currentTarget.classList.add('active');
                
                // Show exercises for the category
                this.showExercises(category);
            });
        });

        // Exercise modal
        document.getElementById('closeExerciseModal').addEventListener('click', () => {
            this.hideExerciseModal();
        });

        // BMI Calculator
        document.getElementById('calculateBMI').addEventListener('click', () => {
            this.calculateBMI();
        });

        // Nutrition Chat
        document.getElementById('sendBtn').addEventListener('click', () => {
            this.sendChatMessage();
        });

        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });

        document.getElementById('photoBtn').addEventListener('click', () => {
            document.getElementById('foodImageInput').click();
        });

        document.getElementById('foodImageInput').addEventListener('change', (e) => {
            this.handleFoodImageUpload(e.target.files[0]);
        });

        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.target.dataset.action);
            });
        });

        // Store functionality
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterProducts(e.target.value);
        });

        document.getElementById('productSearch').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        document.getElementById('cartBtn').addEventListener('click', () => {
            this.showCart();
        });

        document.getElementById('closeCart').addEventListener('click', () => {
            this.hideCart();
        });

        // AI Tracking Event Listeners
        document.getElementById('enableAITracking').addEventListener('click', async () => {
            const success = await this.exerciseTracker.initCamera();
            if (success) {
                document.getElementById('startAIWorkout').disabled = false;
                document.getElementById('aiTrackingInterface').classList.remove('hidden');
                this.aiTrackingEnabled = true;
                this.showNotification('AI Tracking enabled! Select an exercise and start workout.', 'success');
            } else {
                this.showNotification('Failed to access camera. Please check permissions.', 'error');
            }
        });

        document.getElementById('startAIWorkout').addEventListener('click', async () => {
            const selectedExercise = this.getCurrentSelectedExercise();
            if (selectedExercise) {
                try {
                    await this.exerciseTracker.startExercise(selectedExercise);
                    this.showNotification(`Started AI tracking for ${selectedExercise}!`, 'success');
                    document.getElementById('startAIWorkout').disabled = true;
                    document.getElementById('stopAITracking').disabled = false;
                } catch (error) {
                    this.showNotification('Failed to start AI tracking. Please try again.', 'error');
                }
            } else {
                this.showNotification('Please select an exercise category first!', 'error');
            }
        });

        document.getElementById('stopAITracking').addEventListener('click', async () => {
            const stats = await this.exerciseTracker.stopExercise();
            document.getElementById('startAIWorkout').disabled = false;
            document.getElementById('stopAITracking').disabled = true;
            this.showNotification(`Workout stopped! Total reps: ${stats.reps}`, 'success');
        });

        document.getElementById('resetCounter').addEventListener('click', async () => {
            await this.exerciseTracker.resetCounter();
            this.showNotification('Rep counter reset!', 'success');
        });

        document.getElementById('saveWorkout').addEventListener('click', async () => {
            if (this.currentUser && this.exerciseTracker.stats.reps > 0) {
                await this.saveAIWorkoutSession();
            } else {
                this.showNotification('Please complete some reps before saving!', 'error');
            }
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.proceedToCheckout();
        });

        // Trainer filters
        document.getElementById('specialtyFilter').addEventListener('change', (e) => {
            this.filterTrainers('specialty', e.target.value);
        });

        document.getElementById('ratingFilter').addEventListener('change', (e) => {
            this.filterTrainers('rating', e.target.value);
        });

        // Profile navigation
        document.querySelectorAll('.profile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                this.switchProfileSection(section);
            });
        });

        // Profile forms
        document.querySelectorAll('.profile-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfileData(form);
            });
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('auth-modal') || 
                e.target.classList.contains('exercise-modal') || 
                e.target.classList.contains('cart-modal')) {
                e.target.classList.add('hidden');
            }
        });
    }

    // Authentication Methods with Firebase
    showAuthModal() {
        console.log('showAuthModal called');
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.classList.remove('hidden');
            console.log('Auth modal shown');
        } else {
            console.error('Auth modal not found!');
        }
    }

    hideAuthModal() {
        document.getElementById('authModal').classList.add('hidden');
    }

    showRegisterForm() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
    }

    showLoginForm() {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }

    async handleLogin() {
        const email = document.querySelector('#loginForm input[type="email"]').value;
        const password = document.querySelector('#loginForm input[type="password"]').value;

        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        try {
            await this.firebase.signInWithEmailAndPassword(this.firebase.auth, email, password);
            this.hideAuthModal();
            this.showNotification('Welcome back!', 'success');
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification(this.getAuthErrorMessage(error.code), 'error');
        }
    }

    async handleRegister() {
        const fullName = document.querySelector('#registerForm input[type="text"]').value;
        const email = document.querySelector('#registerForm input[type="email"]').value;
        const password = document.querySelector('#registerForm input[type="password"]').value;
        const confirmPassword = document.querySelector('#registerForm input[placeholder="Confirm Password"]').value;

        if (!fullName || !email || !password || !confirmPassword) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            // Create user account
            const userCredential = await this.firebase.createUserWithEmailAndPassword(this.firebase.auth, email, password);
            const user = userCredential.user;

            // Save user profile to Firestore
            await this.firebase.setDoc(this.firebase.doc(this.firebase.db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                fullName: fullName,
                createdAt: this.firebase.serverTimestamp(),
                profile: {
                    age: null,
                    gender: null,
                    height: null,
                    weight: null,
                    fitnessGoal: 'general_fitness',
                    activityLevel: 'moderate'
                },
                settings: {
                    notifications: true,
                    units: 'metric',
                    privacy: 'private'
                }
            });

            this.hideAuthModal();
            this.showNotification('Account created successfully!', 'success');
        } catch (error) {
            console.error('Registration error:', error);
            this.showNotification(this.getAuthErrorMessage(error.code), 'error');
        }
    }

    getAuthErrorMessage(errorCode) {
        const errorMessages = {
            'auth/email-already-in-use': 'This email is already registered',
            'auth/weak-password': 'Password is too weak',
            'auth/invalid-email': 'Invalid email address',
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later'
        };
        return errorMessages[errorCode] || 'An error occurred. Please try again.';
    }

    async handleLogout() {
        try {
            await this.firebase.signOut(this.firebase.auth);
            this.showNotification('Logged out successfully', 'success');
        } catch (error) {
            console.error('Logout error:', error);
            this.showNotification('Error logging out', 'error');
        }
    }

    showMainApp() {
        document.getElementById('landingPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
    }

    showLandingPage() {
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('landingPage').classList.remove('hidden');
    }

    switchTab(tabName) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked tab
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(`${tabName}Page`).classList.add('active');

        if (tabName === 'analytics') {
            this.renderAnalyticsPage();
        }
    }

    setDifficulty(level) {
        this.currentDifficulty = level;
        
        // Update button states
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-level="${level}"]`).classList.add('active');
    }

    showExercises(category) {
        const exercises = exercisesData[category]?.[this.currentDifficulty] || [];
        
        document.getElementById('exerciseModalTitle').textContent = 
            `${category.charAt(0).toUpperCase() + category.slice(1)} - ${this.currentDifficulty.charAt(0).toUpperCase() + this.currentDifficulty.slice(1)}`;
        
        const exerciseList = document.getElementById('exerciseList');
        exerciseList.innerHTML = exercises.map(exercise => `
            <div class="exercise-item">
                <div class="exercise-info">
                    <h4>${exercise.name}</h4>
                    <p><strong>Target:</strong> ${exercise.targetMuscle}</p>
                    <p><strong>Sets:</strong> ${exercise.sets} | <strong>Reps:</strong> ${exercise.reps}</p>
                    <p><strong>Instructions:</strong> ${exercise.instructions}</p>
                </div>
            </div>
        `).join('');

        document.getElementById('exerciseModal').classList.remove('hidden');
    }

    hideExerciseModal() {
        document.getElementById('exerciseModal').classList.add('hidden');
    }

    async calculateBMI() {
        const height = parseFloat(document.getElementById('heightInput').value);
        const weight = parseFloat(document.getElementById('weightInput').value);

        if (!height || !weight) {
            this.showNotification('Please enter both height and weight', 'error');
            return;
        }

        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
        let category, color, advice;

        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#3498db';
            advice = 'Consider consulting a nutritionist for a healthy weight gain plan.';
        } else if (bmi < 25) {
            category = 'Normal weight';
            color = '#27ae60';
            advice = 'Great! Maintain your current lifestyle with regular exercise.';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#f39c12';
            advice = 'Consider a balanced diet and regular exercise routine.';
        } else {
            category = 'Obese';
            color = '#e74c3c';
            advice = 'Consult a healthcare provider for a personalized weight management plan.';
        }

        // Save BMI calculation to Firebase
        if (this.currentUser) {
            try {
                await this.firebase.addDoc(this.firebase.collection(this.firebase.db, 'bmi-history'), {
                    uid: this.currentUser.uid,
                    height: height,
                    weight: weight,
                    bmi: parseFloat(bmi),
                    category: category,
                    calculatedAt: this.firebase.serverTimestamp()
                });
            } catch (error) {
                console.error('Error saving BMI calculation:', error);
            }
        }

        const bmiResult = document.getElementById('bmiResult');
        bmiResult.innerHTML = `
            <div class="bmi-display" style="border-left: 4px solid ${color};">
                <h3>Your BMI: ${bmi}</h3>
                <p style="color: ${color}; font-weight: 600;">${category}</p>
                <p style="font-size: 0.9rem; color: #666;">${advice}</p>
            </div>
        `;
        bmiResult.style.display = 'block';
    }

    // Food Analysis
    handleFoodImage(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('foodUpload').innerHTML = `
                    <img src="${e.target.result}" style="max-width: 200px; max-height: 200px; object-fit: cover; border-radius: 8px;">
                    <p>Food image uploaded successfully!</p>
                `;
            };
            reader.readAsDataURL(file);
        }
    }

    analyzeFoodImage() {
        // Simulate AI food analysis
        const mockAnalysis = {
            food: "Grilled Chicken Salad",
            calories: 320,
            protein: 28,
            carbs: 12,
            fat: 18,
            recommendations: [
                "Great choice for a healthy meal!",
                "High in protein, perfect for muscle building",
                "Consider adding some healthy fats like avocado"
            ]
        };

        this.showNotification(`Analyzed: ${mockAnalysis.food} - ${mockAnalysis.calories} calories`, 'success');
        
        // Update recommendations
        const recommendationsDiv = document.querySelector('.ai-recommendations');
        recommendationsDiv.innerHTML = `
            <div class="recommendation-item">
                <i class="fas fa-utensils"></i>
                <p><strong>${mockAnalysis.food}</strong> - ${mockAnalysis.calories} calories detected</p>
            </div>
            ${mockAnalysis.recommendations.map(rec => `
                <div class="recommendation-item">
                    <i class="fas fa-lightbulb"></i>
                    <p>${rec}</p>
                </div>
            `).join('')}
        `;
    }

    // Store Methods
    displayProducts() {
        this.renderProducts(productsData);
    }

    renderProducts(products) {
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <i class="fas fa-dumbbell"></i>
                </div>
                <div class="product-info">
                    <h4 class="product-title">${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart-btn" onclick="trackFitApp.addToCart(${product.id})" 
                            ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterProducts(category) {
        let filteredProducts = category === 'all' ? productsData : 
                             productsData.filter(product => product.category === category);
        this.renderProducts(filteredProducts);
    }

    searchProducts(query) {
        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        this.renderProducts(filteredProducts);
    }

    addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        if (product && product.inStock) {
            const existingItem = this.cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            
            this.addHapticFeedback();
            this.updateCartCount();
            this.showNotification(`${product.name} added to cart!`, 'success');
        }
    }

    updateCartCount() {
        this.cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = this.cartCount;
    }

    showCart() {
        this.renderCartItems();
        document.getElementById('cartModal').classList.remove('hidden');
    }

    hideCart() {
        document.getElementById('cartModal').classList.add('hidden');
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                </div>
                <button onclick="trackFitApp.removeFromCart(${item.id})" style="background: #ff4757; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">Remove</button>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartCount();
        this.renderCartItems();
        this.showNotification('Item removed from cart', 'success');
    }

    async proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        if (!this.currentUser) {
            this.showNotification('Please log in to place an order', 'error');
            return;
        }

        try {
            // Calculate total
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Create order in Firebase
            const orderRef = await this.firebase.addDoc(this.firebase.collection(this.firebase.db, 'orders'), {
                uid: this.currentUser.uid,
                items: this.cart,
                total: total,
                status: 'pending',
                orderDate: this.firebase.serverTimestamp(),
                shippingAddress: null // This would be collected from a form
            });

            this.showNotification('Order placed successfully!', 'success');
            this.cart = [];
            this.updateCartCount();
            this.hideCart();
            
            console.log('Order created with ID:', orderRef.id);
        } catch (error) {
            console.error('Error placing order:', error);
            this.showNotification('Error placing order. Please try again.', 'error');
        }
    }

    // Trainers Methods
    displayTrainers() {
        this.renderTrainers(trainersData);
    }

    renderTrainers(trainers) {
        const trainersGrid = document.getElementById('trainersGrid');
        trainersGrid.innerHTML = trainers.map(trainer => `
            <div class="trainer-card">
                <div class="trainer-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="trainer-info">
                    <h4 class="trainer-name">${trainer.name}</h4>
                    <p class="trainer-specialty">${trainer.specialty.charAt(0).toUpperCase() + trainer.specialty.slice(1)} Specialist</p>
                    <div class="trainer-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(trainer.rating))}${'☆'.repeat(5 - Math.floor(trainer.rating))}
                        </div>
                        <span>${trainer.rating} (${trainer.reviews} reviews)</span>
                    </div>
                    <p class="trainer-description">${trainer.description}</p>
                    <div class="trainer-price">$${trainer.price}/hour</div>
                    <button class="book-trainer-btn" onclick="trackFitApp.bookTrainer(${trainer.id})">
                        Book Session
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterTrainers(filterType, value) {
        let filteredTrainers = trainersData;
        
        if (filterType === 'specialty' && value !== 'all') {
            filteredTrainers = trainersData.filter(trainer => trainer.specialty === value);
        } else if (filterType === 'rating' && value !== 'all') {
            const minRating = parseFloat(value);
            filteredTrainers = trainersData.filter(trainer => trainer.rating >= minRating);
        }
        
        this.renderTrainers(filteredTrainers);
    }

    async bookTrainer(trainerId) {
        if (!this.currentUser) {
            this.showNotification('Please log in to book a trainer', 'error');
            return;
        }

        const trainer = trainersData.find(t => t.id === trainerId);
        if (!trainer) {
            this.showNotification('Trainer not found', 'error');
            return;
        }

        try {
            // Create booking in Firebase
            const bookingRef = await this.firebase.addDoc(this.firebase.collection(this.firebase.db, 'trainer-bookings'), {
                uid: this.currentUser.uid,
                trainerId: trainerId,
                trainerName: trainer.name,
                specialty: trainer.specialty,
                price: trainer.price,
                status: 'pending',
                bookingDate: this.firebase.serverTimestamp(),
                sessionDate: null, // This would be selected by user
                notes: null
            });

            this.showNotification(`Booking request sent to ${trainer.name}!`, 'success');
            console.log('Booking created with ID:', bookingRef.id);
        } catch (error) {
            console.error('Error booking trainer:', error);
            this.showNotification('Error booking trainer. Please try again.', 'error');
        }
    }

    // Profile Methods
    switchProfileSection(section) {
        document.querySelectorAll('.profile-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        document.querySelectorAll('.profile-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${section}Section`).classList.add('active');
    }

    async saveProfileData(form) {
        if (!this.currentUser) {
            this.showNotification('Please log in to save profile data', 'error');
            return;
        }

        const formData = new FormData(form);
        const profileData = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            profileData[key] = value;
        }

        try {
            // Update user profile in FireStore
            await this.firebase.setDoc(this.firebase.doc(this.firebase.db, 'users', this.currentUser.uid), {
                profile: profileData,
                updatedAt: this.firebase.serverTimestamp()
            }, { merge: true });

            this.showNotification('Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error saving profile:', error);
            this.showNotification('Error saving profile. Please try again.', 'error');
        }
    }

    updateSetting(settingElement, checked) {
        const settingName = settingElement.querySelector('span').textContent;
        this.showNotification(`${settingName} ${checked ? 'enabled' : 'disabled'}`, 'success');
    }

    // Utility Methods
    loadUserData() {
        // Load user data from localStorage or API
        const userData = localStorage.getItem('trackFitUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.showMainApp();
        }
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('trackFitUser', JSON.stringify(this.currentUser));
        }
    }

    // Nutrition Chat Methods with Firebase
    async callGeminiAI(prompt) {
        const apiKey = "AIzaSyADW0nkvwcYvagPzh0WNUVWOnaOKD-ITac";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        // Gather last 3 user messages for context
        const chatMessages = Array.from(document.querySelectorAll('.message.user-message p')).slice(-3).map(el => el.textContent);
        const contextPrompt = chatMessages.length > 0 ? chatMessages.join('\n') + '\n' + prompt : prompt;
        const body = {
            contents: [{ parts: [{ text: contextPrompt }] }]
        };
        try {
            console.log('Sending to Gemini:', contextPrompt);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log('Gemini response:', data);
            if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            } else if (data && data.error && data.error.message) {
                return "Gemini API error: " + data.error.message;
            } else {
                return "Sorry, I couldn't generate a response right now.";
            }
        } catch (e) {
            console.error('Gemini API error:', e);
            return "Sorry, there was an error connecting to Gemini AI.";
        }
    }

    async sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        if (!message) return;
        this.addUserMessage(message);
        chatInput.value = '';
        // Save message to Firebase
        if (this.currentUser) {
            try {
                await this.firebase.addDoc(this.firebase.collection(this.firebase.db, 'nutrition-chats'), {
                    uid: this.currentUser.uid,
                    message: message,
                    sender: 'user',
                    timestamp: this.firebase.serverTimestamp()
                });
            } catch (error) {
                console.error('Error saving chat message:', error);
            }
        }
        this.showTypingIndicator();
        // Use Gemini AI for real response
        const response = await this.callGeminiAI(message);
        this.hideTypingIndicator();
        this.addBotMessage(response);
        // Save AI response to Firebase
        if (this.currentUser) {
            try {
                await this.firebase.addDoc(this.firebase.collection(this.firebase.db, 'nutrition-chats'), {
                    uid: this.currentUser.uid,
                    message: response,
                    sender: 'ai',
                    timestamp: this.firebase.serverTimestamp()
                });
            } catch (error) {
                console.error('Error saving AI chat message:', error);
            }
        }
    }
    
    addUserMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    addBotMessage(message, includeActions = false) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        
        let actionsHTML = '';
        if (includeActions) {
            actionsHTML = `
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="trackFitApp.handleQuickAction('analyze')">📸 Analyze Food Photos</button>
                    <button class="quick-action-btn" onclick="trackFitApp.handleQuickAction('plan')">🍽️ Meal Planning</button>
                    <button class="quick-action-btn" onclick="trackFitApp.handleQuickAction('calories')">🔥 Calorie Tracking</button>
                    <button class="quick-action-btn" onclick="trackFitApp.handleQuickAction('tips')">💡 Nutrition Tips</button>
                </div>
            `;
        }
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                ${actionsHTML}
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        
        if (lowerMessage.includes('calorie') || lowerMessage.includes('calories')) {
            response = "🔥 To track calories effectively, I recommend logging all your meals and snacks. The average adult needs about 2000-2500 calories per day, but this varies based on age, gender, activity level, and goals. Would you like me to help you calculate your specific caloric needs?";
        } else if (lowerMessage.includes('protein')) {
            response = "💪 Protein is essential for muscle building and repair! Aim for 0.8-1.2g per kg of body weight for general health, or 1.6-2.2g per kg if you're strength training. Great sources include lean meats, fish, eggs, dairy, legumes, and nuts.";
        } else if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
            response = "🎯 For healthy weight loss, create a moderate calorie deficit (300-500 calories below maintenance). Focus on whole foods, lean proteins, vegetables, and stay hydrated. Combine this with regular exercise for best results!";
        } else if (lowerMessage.includes('meal plan') || lowerMessage.includes('diet')) {
            response = "🍽️ I can help you create a personalized meal plan! First, tell me about your goals, dietary preferences, and any restrictions. A balanced plan typically includes lean proteins, complex carbs, healthy fats, and plenty of vegetables.";
        } else if (lowerMessage.includes('water') || lowerMessage.includes('hydration')) {
            response = "💧 Great question! Aim for at least 8 glasses (64oz) of water daily, more if you're active. Proper hydration supports metabolism, nutrient transport, and helps control hunger. Try adding lemon or cucumber for flavor!";
        } else if (lowerMessage.includes('supplement')) {
            response = "💊 While whole foods should be your primary source of nutrients, some supplements can be beneficial. Common ones include vitamin D, omega-3s, and a quality multivitamin. Always consult with a healthcare provider before starting any supplements.";
        } else {
            response = "🤖 I'm here to help with your nutrition questions! You can ask me about calories, macronutrients, meal planning, weight management, or upload a food photo for analysis. What specific nutrition topic interests you most?";
        }
        
        this.addBotMessage(response);
        return response;
    }
    
    handleQuickAction(action) {
        switch (action) {
            case 'analyze':
                document.getElementById('foodImageInput').click();
                break;
            case 'plan':
                this.addBotMessage("🍽️ Let's create your personalized meal plan! Please tell me:\n• Your primary goal (weight loss, muscle gain, maintenance)\n• Any dietary restrictions or preferences\n• Your activity level\n• How many meals per day you prefer");
                break;
            case 'calories':
                this.addBotMessage("🔥 I'll help you track your calories! To get started:\n• What's your current weight and height?\n• What's your goal weight?\n• How active are you? (sedentary, lightly active, very active)\n\nI can then calculate your daily caloric needs!");
                break;
            case 'tips':
                this.addBotMessage("💡 Here are some quick nutrition tips:\n• Eat protein with every meal\n• Fill half your plate with vegetables\n• Stay hydrated throughout the day\n• Choose whole grains over refined ones\n• Plan your meals in advance\n\nWould you like me to elaborate on any of these?");
                break;
        }
    }
    
    handleFoodImageUpload(file) {
        if (!file) return;
        
        this.addUserMessage("📸 *Photo uploaded*");
        this.showTypingIndicator();
        
        // Simulate food analysis
        setTimeout(() => {
            this.hideTypingIndicator();
            const foodAnalysis = this.simulateFoodAnalysis();
            this.addBotMessage(`📊 Food Analysis Results:\n\n🍽️ **Detected Food:** ${foodAnalysis.food}\n🔥 **Estimated Calories:** ${foodAnalysis.calories}\n🥩 **Protein:** ${foodAnalysis.protein}g\n🍞 **Carbs:** ${foodAnalysis.carbs}g\n🥑 **Fat:** ${foodAnalysis.fat}g\n\n💡 **Recommendation:** ${foodAnalysis.recommendation}`);
        }, 2000);
    }
    
    simulateFoodAnalysis() {
        const foods = [
            { food: "Grilled Chicken Salad", calories: "350-400", protein: "30", carbs: "15", fat: "18", recommendation: "Great protein source! Consider adding some healthy fats like avocado or nuts for better satiety." },
            { food: "Pasta with Marinara", calories: "450-500", protein: "12", carbs: "65", fat: "8", recommendation: "Good carb source for energy. Try adding some lean protein and vegetables to make it more balanced." },
            { food: "Avocado Toast", calories: "280-320", protein: "8", carbs: "25", fat: "20", recommendation: "Excellent healthy fats! The fiber will help keep you satisfied. Great breakfast choice." },
            { food: "Burger and Fries", calories: "750-900", protein: "25", carbs: "60", fat: "45", recommendation: "High in calories and fat. Consider having this as an occasional treat and balance with lighter meals today." }
        ];
        
        return foods[Math.floor(Math.random() * foods.length)];
    }
    
    showTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'flex';
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'none';
    }
    
    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // AI Tracking Helper Methods
    getCurrentSelectedExercise() {
        // Map exercise categories to supported AI exercises
        const exerciseMapping = {
            'arms': 'biceps',
            'biceps': 'biceps',
            'triceps': 'biceps',
            'chest': 'pushups',
            'back': 'pushups',
            'shoulders': 'biceps',
            'abs': 'squats',
            'legs': 'squats',
            'glutes': 'squats',
            'calves': 'squats'
        };

        // Check if any category is currently selected
        const activeCategory = document.querySelector('.category-card.active');
        if (activeCategory) {
            const category = activeCategory.dataset.category;
            return exerciseMapping[category] || 'biceps';
        }
        
        // Default to biceps if no category selected
        return 'biceps';
    }

    async saveAIWorkoutSession() {
        if (!this.currentUser || !this.exerciseTracker.stats.reps) {
            this.showNotification('Please log in and complete some reps first!', 'error');
            return;
        }

        try {
            const workoutData = {
                category: this.exerciseTracker.currentExercise,
                exercises: [{
                    name: this.exerciseTracker.currentExercise,
                    reps: this.exerciseTracker.stats.reps,
                    sets: 1,
                    duration: this.exerciseTracker.getSessionDuration()
                }],
                duration: this.exerciseTracker.getSessionDuration(),
                caloriesBurned: this.exerciseTracker.calculateCalories(),
                difficulty: this.currentDifficulty,
                notes: `AI-tracked ${this.exerciseTracker.currentExercise} workout with ${this.exerciseTracker.stats.reps} reps`
            };

            // Save to Firebase using existing service
            const workoutRef = await this.firebase.addDoc(
                this.firebase.collection(this.firebase.db, 'workouts'),
                {
                    uid: this.currentUser.uid,
                    category: workoutData.category,
                    exercises: workoutData.exercises,
                    duration: workoutData.duration,
                    caloriesBurned: workoutData.caloriesBurned,
                    difficulty: workoutData.difficulty,
                    completedAt: this.firebase.serverTimestamp(),
                    notes: workoutData.notes,
                    aiTracked: true
                }
            );

            this.showNotification('AI workout saved successfully!', 'success');
            console.log('AI workout saved with ID:', workoutRef.id);
            
            // Reset the tracker
            await this.exerciseTracker.resetCounter();
            
        } catch (error) {
            console.error('Error saving AI workout:', error);
            this.showNotification('Error saving workout. Please try again.', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#10b981';
                break;
            case 'error':
                notification.style.backgroundColor = '#ef4444';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f59e0b';
                break;
            default:
                notification.style.backgroundColor = '#3b82f6';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add this method to TrackFitApp
    async renderAnalyticsPage() {
        if (!this.currentUser) return;
        // Fetch analytics
        const { getWorkoutAnalytics, getWorkoutHistory } = window.WorkoutService || {};
        let stats = { totalWorkouts: 0, totalCalories: 0, totalDuration: 0 };
        let history = [];
        if (getWorkoutAnalytics && getWorkoutHistory) {
            const statsRes = await getWorkoutAnalytics(this.currentUser.uid);
            if (statsRes.success) stats = statsRes.data;
            const histRes = await getWorkoutHistory(this.currentUser.uid, 5);
            if (histRes.success) history = histRes.data;
        }
        // Update stats
        const statsGrid = document.querySelector('#analyticsPage .stats-grid');
        if (statsGrid) {
            statsGrid.innerHTML = `
                <div class="stat-item">
                    <span class="stat-number">${stats.totalWorkouts ?? 0}</span>
                    <span class="stat-label">Workouts This Month</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.totalCalories ?? 0}</span>
                    <span class="stat-label">Calories Burned</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${(stats.totalDuration/60).toFixed(1) ?? 0}</span>
                    <span class="stat-label">Hours Exercised</span>
                </div>
            `;
        }
        // Update history
        const historyDiv = document.querySelector('#analyticsPage .workout-history');
        if (historyDiv) {
            historyDiv.innerHTML = history.length ? history.map(w => `
                <div class="history-item">
                    <div class="history-date">${w.completedAt ? new Date(w.completedAt.seconds*1000).toLocaleDateString() : ''}</div>
                    <div class="history-workout">${w.category || 'Workout'}</div>
                    <div class="history-duration">${w.duration ? Math.round(w.duration/60) + ' min' : ''}</div>
                    <div class="history-calories">${w.caloriesBurned ? w.caloriesBurned + ' cal' : ''}</div>
                </div>
            `).join('') : '<div>No workout history found.</div>';
        }
    }
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing TrackFit AI...');
    try {
        window.trackFitApp = new TrackFitApp();
        console.log('TrackFit AI initialized successfully');
    } catch (error) {
        console.error('Error initializing TrackFit AI:', error);
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrackFitApp;
} 