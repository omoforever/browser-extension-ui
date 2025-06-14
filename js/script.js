var extensions = [
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
]

var filter_state = "all";
var filtered_list = extensions;

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Optional: Change icon
    const icon = document.getElementById('theme-icon');
    const dark = document.body.classList.contains('dark-mode');
    icon.src = dark ? './assets/images/icon-sun.svg' : './assets/images/icon-moon.svg';


    // Optional: Save preference
    localStorage.setItem('darkMode', dark ? 'enabled' : 'disabled');
}

// On load, restore user preference
window.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').src = 'assets/images/icon-sun.svg';
    }
});


function setFilterState(state) {
    filter_state = state;

    if (filter_state === "active") {
        filtered_list = extensions.filter(extension => extension.isActive === true);
    } else if (filter_state === "inactive") {
        filtered_list = extensions.filter(extension => extension.isActive !== true);
    } else {
        filtered_list = extensions;
    }

    document.querySelectorAll('.filter-bar-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`filter-${filter_state}`).classList.add('active');
    renderExtensions();
}
function renderExtensions() {
    var gridContainer = document.getElementById("extensions-grid");

    var gridItems = filtered_list.map(extension => `
    <div class="extension-item">
      <div class="extension-item-row">
        <img src="${extension.logo}" alt="">
        <div class="extension-item-info">
          <h5>${extension.name}</h5>
          <p>${extension.description}</p>
        </div>
      </div>
      <div class="extension-item-buttons">
        <button class="remove-extension-button">Remove</button>
        <label class="switch">
          <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  `).join('');

    gridContainer.innerHTML = gridItems;
}

document.getElementById(`filter-${filter_state}`).classList.add('active');
renderExtensions();