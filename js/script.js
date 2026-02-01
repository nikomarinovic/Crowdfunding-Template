// ===== Smooth Scrolling =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ===== Funding Stats Counter Animation =====
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + target.toLocaleString('en-EU') + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(current).toLocaleString('en-EU') + suffix;
        }
    }, 16);
}

// ===== Progress Bar Animation =====
function animateProgressBar() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
}

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ===== Reward Modal System =====
let currentStep = 'details';
let currentRewardData = {};

function openRewardModal(price, title, benefits) {
    currentRewardData = { price, title, benefits };
    currentStep = 'details';
    
    const modal = document.getElementById('rewardModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = getRewardModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('rewardModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentStep = 'details';
}

function getRewardModalContent() {
    if (currentStep === 'details') {
        return `
            <div class="modal-header">
                <div class="modal-header-icon">
                    <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="modal-title">${currentRewardData.title}</div>
                <div class="modal-subtitle">€${currentRewardData.price} contribution</div>
            </div>
            <div class="modal-body">
                <form class="modal-form" onsubmit="handleRewardSubmit(event)">
                    <div class="form-group">
                        <label class="form-label" for="name">Full Name</label>
                        <input class="form-input" id="name" type="text" placeholder="John Doe" required />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="email">Email Address</label>
                        <input class="form-input" id="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div class="benefits-list">
                        <strong style="display: block; margin-bottom: 12px; color: var(--foreground);">You'll receive:</strong>
                        ${currentRewardData.benefits.map(benefit => `
                            <li>
                                <svg class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                ${benefit}
                            </li>
                        `).join('')}
                    </div>
                    <button type="submit" class="btn-modal">Continue to Payment</button>
                    <p class="modal-disclaimer">This is a demo. No real payment will be processed.</p>
                </form>
            </div>
        `;
    } else if (currentStep === 'payment') {
        return `
            <div class="modal-header">
                <div class="modal-header-icon">
                    <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <div class="modal-title">Payment Details</div>
                <div class="modal-subtitle">Complete your €${currentRewardData.price} contribution</div>
            </div>
            <div class="modal-body">
                <form class="modal-form" onsubmit="handlePaymentSubmit(event)">
                    <div class="payment-method">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span class="payment-method-text">Card Payment</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="cardNumber">Card Number</label>
                        <input class="form-input" id="cardNumber" type="text" placeholder="4242 4242 4242 4242" maxlength="19" required />
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group">
                            <label class="form-label" for="expiry">Expiry Date</label>
                            <input class="form-input" id="expiry" type="text" placeholder="MM/YY" maxlength="5" required />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="cvc">CVC</label>
                            <input class="form-input" id="cvc" type="text" placeholder="123" maxlength="3" required />
                        </div>
                    </div>
                    
                    <div class="security-badge">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span class="security-text">Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <button type="button" class="btn-modal btn-modal-secondary" onclick="goBackToDetails()">Back</button>
                        <button type="submit" class="btn-modal" style="flex: 1;">Pay €${currentRewardData.price}</button>
                    </div>
                    
                    <p class="modal-disclaimer">This is a demo. No real payment will be processed.</p>
                </form>
            </div>
        `;
    } else if (currentStep === 'success') {
        return `
            <div class="modal-body" style="padding: 48px 32px;">
                <div class="success-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="success-title">Backing Confirmed!</div>
                <p class="success-message">
                    You've successfully pledged €${currentRewardData.price} to Bela Blok. Check your email for confirmation.
                </p>
                <div class="benefits-list">
                    <strong style="display: block; margin-bottom: 12px; color: var(--foreground);">Your rewards:</strong>
                    ${currentRewardData.benefits.map(benefit => `
                        <li>
                            <svg class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            ${benefit}
                        </li>
                    `).join('')}
                </div>
                <button class="btn-modal" style="margin-top: 24px;" onclick="closeModal()">Done</button>
            </div>
        `;
    }
}

function handleRewardSubmit(event) {
    event.preventDefault();
    currentStep = 'payment';
    document.getElementById('modalBody').innerHTML = getRewardModalContent();
    
    // Add card formatting
    setupCardFormatting();
}

function goBackToDetails() {
    currentStep = 'details';
    document.getElementById('modalBody').innerHTML = getRewardModalContent();
}

function handlePaymentSubmit(event) {
    event.preventDefault();
    
    // Simulate payment processing
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        currentStep = 'success';
        document.getElementById('modalBody').innerHTML = getRewardModalContent();
    }, 1500);
}

function setupCardFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiry');
    const cvcInput = document.getElementById('cvc');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (cvcInput) {
        cvcInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// ===== Investment Modal System =====
let currentInvestStep = 'details';
let investmentAmount = 500;

function openInvestModal() {
    currentInvestStep = 'details';
    investmentAmount = 500;
    
    const modal = document.getElementById('investModal');
    const modalBody = document.getElementById('investModalBody');
    
    modalBody.innerHTML = getInvestModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Setup equity calculator
    setupEquityCalculator();
}

function closeInvestModal() {
    const modal = document.getElementById('investModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentInvestStep = 'details';
}

function getInvestModalContent() {
    if (currentInvestStep === 'details') {
        const equityPercentage = ((investmentAmount / 150000) * 100).toFixed(2);
        
        return `
            <div class="modal-header">
                <div class="modal-header-icon">
                    <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <div class="modal-title">Equity Investment</div>
                <div class="modal-subtitle">Become a shareholder in Bela Blok</div>
            </div>
            <div class="modal-body">
                <form class="modal-form" onsubmit="handleInvestDetailsSubmit(event)">
                    <div class="form-group">
                        <label class="form-label" for="investAmount">Investment Amount (€)</label>
                        <input class="form-input" id="investAmount" type="number" min="500" step="100" value="500" required />
                    </div>
                    
                    <div style="background: hsl(174 60% 40% / 0.1); padding: 20px; border-radius: var(--radius); margin: 16px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="color: var(--muted-foreground);">Your Equity:</span>
                            <span id="equityDisplay" style="font-size: 24px; font-weight: 800; color: var(--primary);">${equityPercentage}%</span>
                        </div>
                        <div style="font-size: 13px; color: var(--muted-foreground);">
                            Based on €150,000 valuation
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="investName">Full Name</label>
                        <input class="form-input" id="investName" type="text" placeholder="John Doe" required />
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="investEmail">Email Address</label>
                        <input class="form-input" id="investEmail" type="email" placeholder="john@example.com" required />
                    </div>
                    
                    <button type="submit" class="btn-modal">Continue to Payment</button>
                    <p class="modal-disclaimer">This is a demo. No real investment will be processed.</p>
                </form>
            </div>
        `;
    } else if (currentInvestStep === 'payment') {
        return `
            <div class="modal-header">
                <div class="modal-header-icon">
                    <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <div class="modal-title">Payment Details</div>
                <div class="modal-subtitle">Complete your €${investmentAmount} investment</div>
            </div>
            <div class="modal-body">
                <form class="modal-form" onsubmit="handleInvestPaymentSubmit(event)">
                    <div class="payment-method">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span class="payment-method-text">Card Payment</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="investCardNumber">Card Number</label>
                        <input class="form-input" id="investCardNumber" type="text" placeholder="4242 4242 4242 4242" maxlength="19" required />
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group">
                            <label class="form-label" for="investExpiry">Expiry Date</label>
                            <input class="form-input" id="investExpiry" type="text" placeholder="MM/YY" maxlength="5" required />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="investCvc">CVC</label>
                            <input class="form-input" id="investCvc" type="text" placeholder="123" maxlength="3" required />
                        </div>
                    </div>
                    
                    <div class="security-badge">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span class="security-text">Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <button type="button" class="btn-modal btn-modal-secondary" onclick="goBackToInvestDetails()">Back</button>
                        <button type="submit" class="btn-modal" style="flex: 1;">Invest €${investmentAmount}</button>
                    </div>
                    
                    <p class="modal-disclaimer">This is a demo. No real investment will be processed.</p>
                </form>
            </div>
        `;
    } else if (currentInvestStep === 'success') {
        const equityPercentage = ((investmentAmount / 150000) * 100).toFixed(2);
        
        return `
            <div class="modal-body" style="padding: 48px 32px;">
                <div class="success-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="success-title">Investment Confirmed!</div>
                <p class="success-message">
                    You've successfully invested €${investmentAmount} in Bela Blok and acquired ${equityPercentage}% equity.
                </p>
                <div class="benefits-list">
                    <strong style="display: block; margin-bottom: 12px; color: var(--foreground);">What happens next:</strong>
                    <li>
                        <svg class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Digital shareholder certificate sent to your email
                    </li>
                    <li>
                        <svg class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Access to investor dashboard and updates
                    </li>
                    <li>
                        <svg class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Revenue share based on ${equityPercentage}% ownership
                    </li>
                </div>
                <button class="btn-modal" style="margin-top: 24px;" onclick="closeInvestModal()">Done</button>
            </div>
        `;
    }
}

function setupEquityCalculator() {
    const amountInput = document.getElementById('investAmount');
    const equityDisplay = document.getElementById('equityDisplay');
    
    if (amountInput && equityDisplay) {
        amountInput.addEventListener('input', (e) => {
            const amount = parseFloat(e.target.value) || 500;
            if (amount >= 500) {
                investmentAmount = amount;
                const equity = ((amount / 150000) * 100).toFixed(2);
                equityDisplay.textContent = equity + '%';
            }
        });
    }
}

function handleInvestDetailsSubmit(event) {
    event.preventDefault();
    investmentAmount = parseFloat(document.getElementById('investAmount').value) || 500;
    currentInvestStep = 'payment';
    document.getElementById('investModalBody').innerHTML = getInvestModalContent();
    
    // Setup card formatting for investment form
    setupInvestCardFormatting();
}

function goBackToInvestDetails() {
    currentInvestStep = 'details';
    document.getElementById('investModalBody').innerHTML = getInvestModalContent();
    setupEquityCalculator();
}

function handleInvestPaymentSubmit(event) {
    event.preventDefault();
    
    // Simulate payment processing
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        currentInvestStep = 'success';
        document.getElementById('investModalBody').innerHTML = getInvestModalContent();
    }, 1500);
}

function setupInvestCardFormatting() {
    const cardNumberInput = document.getElementById('investCardNumber');
    const expiryInput = document.getElementById('investExpiry');
    const cvcInput = document.getElementById('investCvc');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (cvcInput) {
        cvcInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// ===== Close Modal on Overlay Click =====
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        const rewardModal = document.getElementById('rewardModal');
        const investModal = document.getElementById('investModal');
        
        if (rewardModal.classList.contains('active')) {
            closeModal();
        }
        if (investModal.classList.contains('active')) {
            closeInvestModal();
        }
    }
});

// ===== Close Modal on Escape Key =====
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeInvestModal();
    }
});

// ===== Initialize on Page Load =====
window.addEventListener('load', () => {
    // Animate funding stats
    const statValues = document.querySelectorAll('.stat-value');
    setTimeout(() => {
        statValues.forEach((stat, index) => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (index === 0) {
                // For currency
                animateCounter(stat, target, 2000, '€');
            } else {
                // For numbers
                animateCounter(stat, target, 2000);
            }
        });
    }, 500);
    
    // Animate progress bars
    animateProgressBar();
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .reward-card, .comparison-card, .timeline-item, .budget-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate budget bars on scroll
    const budgetSection = document.querySelector('.transparency-section');
    if (budgetSection) {
        const budgetObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const budgetFills = entry.target.querySelectorAll('.budget-fill');
                    budgetFills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 300);
                    });
                    budgetObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        budgetObserver.observe(budgetSection);
    }
});