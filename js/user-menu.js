// User menu functionality for DigiMart
function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('active');
}

function logoutUser() {
  sessionStorage.removeItem('digimartLoggedIn');
  sessionStorage.removeItem('digimartUserEmail');
  alert('Logged out successfully!');
  window.location.href = 'index.html';
}

// Load user info on page load
function initUserMenu() {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  const userIcon = document.getElementById('userIcon');
  const displayEmail = document.getElementById('displayEmail');
  
  if (userEmail && userIcon && displayEmail) {
    displayEmail.textContent = userEmail;
    // Set user icon to first letter of email
    userIcon.textContent = userEmail.charAt(0).toUpperCase();
    
    // Check if user is a seller and add seller dashboard link
    if (typeof isUserSeller !== 'undefined' && isUserSeller()) {
      addSellerDashboardLink();
    }
  }
}

// Add seller dashboard link to user menu
function addSellerDashboardLink() {
  const userDropdown = document.getElementById('userDropdown');
  if (!userDropdown) return;
  
  // Check if link already exists
  if (document.getElementById('sellerDashboardLink')) return;
  
  // Find the user info div
  const userInfo = userDropdown.querySelector('.user-info');
  if (!userInfo) return;
  
  // Create seller dashboard link
  const sellerLink = document.createElement('a');
  sellerLink.id = 'sellerDashboardLink';
  
  // Detect if we're in a subfolder (user/) and adjust path accordingly
  const isInSubfolder = window.location.pathname.includes('/user/');
  sellerLink.href = isInSubfolder ? '../seller/seller-dashboard.html' : 'seller/seller-dashboard.html';
  
  sellerLink.innerHTML = '🏪 Seller Dashboard';
  sellerLink.style.borderTop = '1px solid #e6eef0';
  sellerLink.style.background = 'linear-gradient(135deg, rgba(14,165,164,0.05), rgba(6,182,212,0.05))';
  sellerLink.style.fontWeight = '600';
  sellerLink.style.color = '#0ea5a4';
  
  // Insert after user info
  userInfo.insertAdjacentElement('afterend', sellerLink);
  
  // Update user role display
  const userRole = userInfo.querySelector('.user-role');
  if (userRole) {
    userRole.textContent = 'Seller';
    userRole.style.color = '#0ea5a4';
  }
}

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
  if (!e.target.matches('.user-icon') && !e.target.closest('.user-dropdown')) {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
    }
  }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', initUserMenu);
