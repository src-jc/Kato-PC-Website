const troubleshootingGuides = {
    nopower: {
        title: "PC Won't Turn On",
        steps: [
            {
                heading: "Step 1: Check Power Connections",
                items: [
                    "Ensure the power cable is securely plugged into both the PC and wall outlet",
                    "Check if the power strip/surge protector is turned on",
                    "Try a different power outlet to rule out outlet issues",
                    "Verify the PSU switch on the back of the PC is in the 'ON' position (I, not O)"
                ]
            },
            {
                heading: "Step 2: Test the Power Supply",
                items: [
                    "Listen for any fans spinning when you press the power button",
                    "Check for any LED lights on the motherboard",
                    "If nothing happens, the PSU may be faulty",
                    "Try disconnecting all non-essential components and test again"
                ]
            },
            {
                heading: "Step 3: Check Internal Connections",
                items: [
                    "Power off and unplug the PC completely",
                    "Open the case and reseat the RAM modules",
                    "Check that all power cables are firmly connected to the motherboard",
                    "Ensure the CPU power connector (4/8 pin) is properly connected"
                ]
            }
        ],
        warning: "If you're uncomfortable opening your PC or the issue persists, please contact a professional."
    },
    overheating: {
        title: "Overheating Issues",
        steps: [
            {
                heading: "Step 1: Check Ventilation",
                items: [
                    "Ensure your PC has adequate space around it for airflow (at least 6 inches)",
                    "Remove any obstructions blocking air vents",
                    "Make sure the PC isn't placed in a confined space or cabinet",
                    "Check that all case fans are spinning properly"
                ]
            },
            {
                heading: "Step 2: Clean Dust and Debris",
                items: [
                    "Power off and unplug your PC",
                    "Use compressed air to clean dust from fans, heatsinks, and vents",
                    "Pay special attention to CPU cooler and GPU fans",
                    "Clean dust filters if your case has them"
                ]
            },
            {
                heading: "Step 3: Monitor Temperatures",
                items: [
                    "Download monitoring software like HWMonitor or Core Temp",
                    "Check CPU and GPU temperatures during idle and load",
                    "Normal idle: 30-50°C, Load: up to 80-85°C",
                    "If temperatures are still high, thermal paste may need replacing"
                ]
            }
        ],
        warning: "Consistent overheating can damage components. If cleaning doesn't help, professional service is recommended."
    },
    slowperformance: {
        title: "Slow Performance",
        steps: [
            {
                heading: "Step 1: Check Resource Usage",
                items: [
                    "Press Ctrl+Shift+Esc to open Task Manager",
                    "Check CPU, Memory, and Disk usage in the Performance tab",
                    "Identify programs using excessive resources in the Processes tab",
                    "Close unnecessary programs and browser tabs"
                ]
            },
            {
                heading: "Step 2: Check for Malware",
                items: [
                    "Run a full system scan with Windows Defender or your antivirus",
                    "Use Malwarebytes for additional scanning (free version available)",
                    "Remove any detected threats",
                    "Check browser extensions and remove suspicious ones"
                ]
            },
            {
                heading: "Step 3: Optimize Startup Programs",
                items: [
                    "Open Task Manager and go to the Startup tab",
                    "Disable programs you don't need at startup",
                    "Keep essential programs like antivirus enabled",
                    "Restart your PC to apply changes"
                ]
            },
            {
                heading: "Step 4: Storage Optimization",
                items: [
                    "Check if your system drive has at least 15% free space",
                    "Run Disk Cleanup to remove temporary files",
                    "Defragment HDD (not needed for SSDs)",
                    "Consider upgrading to an SSD if using HDD"
                ]
            }
        ],
        warning: "If performance issues persist, you may need hardware upgrades or professional diagnosis."
    },
    noiseissues: {
        title: "Unusual Noises",
        steps: [
            {
                heading: "Step 1: Identify the Source",
                items: [
                    "Listen carefully to determine which component is making noise",
                    "Common sources: fans (case, CPU, GPU), hard drives, PSU",
                    "Clicking or grinding sounds from HDD indicate potential failure",
                    "Rattling could be a loose cable touching a fan"
                ]
            },
            {
                heading: "Step 2: Clean and Inspect Fans",
                items: [
                    "Power off and unplug the PC",
                    "Clean dust from all fans using compressed air",
                    "Check for loose fan screws or mounting brackets",
                    "Ensure no cables are touching fan blades"
                ]
            },
            {
                heading: "Step 3: Check Hard Drives",
                items: [
                    "Backup important data immediately if you hear clicking",
                    "Run disk health checks (CrystalDiskInfo is a free tool)",
                    "Consider replacing the drive if health status shows warnings",
                    "SSDs are silent alternatives to noisy HDDs"
                ]
            }
        ],
        warning: "Unusual noises, especially clicking from hard drives, can indicate imminent hardware failure. Backup data immediately."
    },
    nodisplay: {
        title: "No Display Output",
        steps: [
            {
                heading: "Step 1: Check Monitor and Cables",
                items: [
                    "Ensure the monitor is powered on and set to the correct input",
                    "Check that cables are securely connected to both monitor and PC",
                    "Try a different cable or video port (HDMI, DisplayPort, etc.)",
                    "Test the monitor with another device to rule out monitor issues"
                ]
            },
            {
                heading: "Step 2: Check Graphics Card",
                items: [
                    "If you have a dedicated GPU, ensure your cable is connected to it, not the motherboard",
                    "Check that the GPU is properly seated in its PCIe slot",
                    "Verify that GPU power cables are fully connected",
                    "Look for LED indicators or error lights on the GPU"
                ]
            },
            {
                heading: "Step 3: Reseat Components",
                items: [
                    "Power off and unplug completely",
                    "Remove and reseat RAM modules (try one stick at a time)",
                    "Reseat the graphics card",
                    "Clear CMOS by removing the motherboard battery for 30 seconds"
                ]
            }
        ],
        warning: "If you see no POST screen or BIOS, there may be a hardware compatibility or failure issue."
    },
    bluscreen: {
        title: "Blue Screen Errors (BSOD)",
        steps: [
            {
                heading: "Step 1: Note the Error Code",
                items: [
                    "Write down or photograph the error code (e.g., STOP: 0x0000001E)",
                    "Note any .sys file names mentioned in the error",
                    "Search the error code online for specific solutions",
                    "Windows 10/11 shows a QR code you can scan for info"
                ]
            },
            {
                heading: "Step 2: Update Drivers",
                items: [
                    "Boot into Safe Mode if normal boot fails (restart and press F8)",
                    "Update graphics drivers from manufacturer website",
                    "Update chipset and other motherboard drivers",
                    "Uninstall recently installed drivers that might be causing issues"
                ]
            },
            {
                heading: "Step 3: Check for Hardware Issues",
                items: [
                    "Run Windows Memory Diagnostic to test RAM",
                    "Check hard drive health with manufacturer tools",
                    "Ensure all components are properly seated",
                    "Check temperatures aren't causing instability"
                ]
            },
            {
                heading: "Step 4: System File Check",
                items: [
                    "Open Command Prompt as Administrator",
                    "Run 'sfc /scannow' to check system files",
                    "Run 'DISM /Online /Cleanup-Image /RestoreHealth' if sfc finds issues",
                    "Restart after completion"
                ]
            }
        ],
        warning: "Frequent BSODs indicate serious hardware or driver issues. Document all error codes and contact support."
    },
    internetissues: {
        title: "Internet/Network Problems",
        steps: [
            {
                heading: "Step 1: Basic Troubleshooting",
                items: [
                    "Restart your PC, modem, and router",
                    "Check that network cables are securely connected (if wired)",
                    "Verify WiFi is turned on and you're connected to the correct network",
                    "Try connecting to a different network to isolate the issue"
                ]
            },
            {
                heading: "Step 2: Network Adapter",
                items: [
                    "Open Device Manager (Win+X, then select Device Manager)",
                    "Expand 'Network adapters'",
                    "Right-click your adapter and select 'Update driver'",
                    "If issues persist, uninstall and restart to reinstall"
                ]
            },
            {
                heading: "Step 3: Reset Network Settings",
                items: [
                    "Open Command Prompt as Administrator",
                    "Type 'ipconfig /flushdns' and press Enter",
                    "Type 'netsh winsock reset' and press Enter",
                    "Type 'netsh int ip reset' and press Enter",
                    "Restart your PC"
                ]
            },
            {
                heading: "Step 4: Check Firewall and Security",
                items: [
                    "Temporarily disable firewall to test if it's blocking connection",
                    "Check if VPN software is interfering",
                    "Ensure antivirus isn't blocking network access",
                    "Re-enable firewall after testing"
                ]
            }
        ],
        warning: "If problems persist after these steps, contact your ISP or check router settings."
    }
};

function showTroubleshooting() {
    const select = document.getElementById('issueCategory');
    const container = document.getElementById('troubleshootingSteps');
    const selectedIssue = select.value;

    if (!selectedIssue) {
        container.innerHTML = '';
        return;
    }
    const guide = troubleshootingGuides[selectedIssue];
    let html = `<h3>${guide.title}</h3>`;

    guide.steps.forEach(step => {
        html += `
            <div class="step-container">
                <h3>${step.heading}</h3>
                <ul>
                    ${step.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    html += `
        <div class="warning-box">
            <strong>⚠️ Important:</strong> ${guide.warning}
        </div>
    `;

    container.innerHTML = html;
}

function getSystemInfo() {
    const container = document.getElementById('systemInfo');

    const info = {
        'Platform': navigator.platform,
        'Browser': navigator.userAgent.split(')')[0].split('(')[1],
        'Browser Name': getBrowserName(),
        'Screen Resolution': `${screen.width} x ${screen.height}`,
        'Color Depth': `${screen.colorDepth}-bit`,
        'CPU Cores': navigator.hardwareConcurrency || 'N/A',
        'Language': navigator.language,
        'Online Status': navigator.onLine ? 'Connected' : 'Offline',
        'Cookies Enabled': navigator.cookieEnabled ? 'Yes' : 'No'
    };

    let html = '<h3>Your System Information</h3>';
    html += '<p style="margin-bottom: 15px; color: #666;">Share this information when contacting support:</p>';

    for (const [label, value] of Object.entries(info)) {
        html += `
            <div class="info-item">
                <div class="info-label">${label}:</div>
                <div class="info-value">${value}</div>
            </div>
        `;
    }

    container.innerHTML = html;
    container.classList.add('active');
}

function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Mozilla Firefox';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Google Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Apple Safari';
    if (ua.includes('Edg')) return 'Microsoft Edge';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return 'Unknown Browser';
}

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const wasActive = faqItem.classList.contains('active');


    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('supportForm');
    const messageDiv = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            issue: document.getElementById('issue').value,
            description: document.getElementById('description').value,
            urgency: document.getElementById('urgency').value,
            timestamp: new Date().toISOString()
        };

        console.log('Support Request:', formData);

        messageDiv.className = 'form-message success';
        messageDiv.innerHTML = `
            <strong>✓ Request Submitted Successfully!</strong><br>
            Thank you, ${formData.name}. We've received your support request.<br>
            A confirmation email has been sent to ${formData.email}.<br>
            Our team will respond within ${getResponseTime(formData.urgency)}.
        `;

        form.reset();

        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
            messageDiv.classList.remove('success');
            messageDiv.style.display = 'none';
        }, 10000);
    });
});

function getResponseTime(urgency) {
    switch(urgency) {
        case 'high':
            return '4 hours';
        case 'medium':
            return '48 hours';
        case 'low':
            return '3-5 business days';
        default:
            return '48 hours';
    }
}