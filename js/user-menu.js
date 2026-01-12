// User menu functionality for DigiMart
function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('active');
}

async function logoutUser() {
  const path = window.location.pathname;
  let apiBase = '';
  let redirectBase = '';

  if (path.includes('/user/') || path.includes('/seller/')) {
    apiBase = '../';
    redirectBase = '../';
  }

  await fetch(apiBase + 'api/auth/logout.php');
  sessionStorage.removeItem('digimartLoggedIn'); // Clear session
  alert('Logged out successfully!');
  window.location.href = redirectBase + 'index.html';
}

// Load user info on page load
// Load user info on page load
async function initUserMenu() {
  try {
    // Determine API path adjustment based on current directory
    const path = window.location.pathname;
    let apiBase = '';
    if (path.includes('/user/') || path.includes('/seller/')) {
      apiBase = '../';
    }

    const res = await fetch(apiBase + 'api/auth/session.php');
    const data = await res.json();

    // Check elements exist
    const userIcon = document.getElementById('userIcon');
    const displayEmail = document.getElementById('displayEmail');
    const userDropdown = document.getElementById('userDropdown');

    if (data.loggedIn && userIcon && displayEmail) {
      console.log("Updated email in header:", data.user.email);
      sessionStorage.setItem('digimartLoggedIn', 'true');
      displayEmail.textContent = data.user.email;
      userIcon.textContent = data.user.email.charAt(0).toUpperCase(); // Show Initial

      // Update links 
      const loginLinks = document.querySelectorAll('nav a[href="login.html"], nav a[href="register.html"]');
      loginLinks.forEach(l => l.style.display = 'none');

      document.querySelector('.user-menu').style.display = 'block';

      if (data.user.isSeller) {
        addSellerDashboardLink();
      }
    } else {
      // IMPORTANT: Clear session storage when not logged in
      sessionStorage.removeItem('digimartLoggedIn');

      // Hide user menu if not logged in
      const um = document.querySelector('.user-menu');
      if (um) um.style.display = 'none';

      // Ensure login links are visible
      const loginLinks = document.querySelectorAll('nav a[href="login.html"], nav a[href="register.html"]');
      loginLinks.forEach(l => l.style.display = 'inline-block');
    }
  } catch (e) {
    console.log("Session check failed", e);
    // Clear session storage on error
    sessionStorage.removeItem('digimartLoggedIn');
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
window.addEventListener('click', function (e) {
  if (!e.target.matches('.user-icon') && !e.target.closest('.user-dropdown')) {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
    }
  }
});

// Initialize on page load
// Initialize on page load
window.addEventListener('DOMContentLoaded', initUserMenu);

// Global Navigation Handler
function handleLogoClick() {
  // ONLY check sessionStorage - this is the source of truth
  const loggedIn = sessionStorage.getItem('digimartLoggedIn') === 'true';

  if (loggedIn) {
    // Navigate to products page
    const path = window.location.pathname;
    let target = 'products.html';
    if (path.includes('/user/') || path.includes('/seller/')) {
      target = '../products.html';
    }
    window.location.href = target;
  } else {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
