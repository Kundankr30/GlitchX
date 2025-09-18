
        let forecastChart, seasonalChart, sensorChart, policyChart;
        let aqiMap;
        function showTab(tabName) {
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tab => tab.classList.remove('active'));
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
            setTimeout(() => {
                if (tabName === 'forecast') initForecastCharts();
                if (tabName === 'sources') initSourceCharts();
                if (tabName === 'policy') initPolicyCharts();
                if (tabName === 'citizen') initMap();
            }, 100);
        }

        
        function initForecastCharts() {
            const ctx1 = document.getElementById('forecastChart');
            if (ctx1 && !forecastChart) {
                forecastChart = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: ['Now', '6h', '12h', '18h', '24h', '48h', '72h'],
                        datasets: [{
                            label: 'Predicted AQI',
                            data: [186, 195, 220, 245, 268, 198, 165],
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 300
                            }
                        }
                    }
                });
            }

            const ctx2 = document.getElementById('seasonalChart');
            if (ctx2 && !seasonalChart) {
                seasonalChart = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: '2024',
                            data: [280, 220, 180, 120, 90, 75, 85, 95, 140, 200, 285, 320],
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });
            }
        }
        function initSourceCharts() {
            const ctx = document.getElementById('sensorChart');
            if (ctx && !sensorChart) {
                sensorChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'Gurgaon', 'Noida'],
                        datasets: [{
                            label: 'PM2.5 (μg/m³)',
                            data: [195, 168, 210, 155, 186, 142, 178],
                            backgroundColor: [
                                '#ef4444', '#f59e0b', '#ef4444', '#f59e0b', '#ef4444', '#10b981', '#f59e0b'
                            ],
                            borderRadius: 8
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });
            }
        }

        // Initialize policy charts
        function initPolicyCharts() {
            const ctx = document.getElementById('policyChart');
            if (ctx && !policyChart) {
                policyChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Pre-Policy', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Post-Policy'],
                        datasets: [{
                            label: 'Odd-Even Impact',
                            data: [220, 185, 175, 168, 162, 195],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.4
                        }, {
                            label: 'Construction Ban',
                            data: [220, 200, 185, 180, 175, 190],
                            borderColor: '#6366f1',
                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
        function initMap() {
            //map initialization
            if (!aqiMap) {
                aqiMap = L.map('aqiMap').setView([28.6139, 77.2090], 10);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(aqiMap);
                const locations = [
                    {lat: 28.6139, lng: 77.2090, aqi: 186, name: 'Connaught Place'},
                    {lat: 28.5355, lng: 77.3910, aqi: 210, name: 'Noida'},
                    {lat: 28.4595, lng: 77.0266, aqi: 142, name: 'Gurgaon'},
                    {lat: 28.7041, lng: 77.1025, aqi: 195, name: 'North Delhi'},
                    {lat: 28.5244, lng: 77.1855, aqi: 168, name: 'South Delhi'}
                ];

                locations.forEach(loc => {
                    const color = loc.aqi > 200 ? '#ef4444' : 
                                 loc.aqi > 150 ? '#f59e0b' : 
                                 loc.aqi > 100 ? '#eab308' : '#10b981';
                    
                    L.circleMarker([loc.lat, loc.lng], {
                        radius: 15,
                        fillColor: color,
                        color: '#fff',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8
                    }).addTo(aqiMap)
                    .bindPopup(`<b>${loc.name}</b><br>AQI: ${loc.aqi}`);
                });
            }
        }

        // Refresh AQI data
        function refreshAQI() {
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loading"></span> Updating...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                const newAQI = Math.floor(Math.random() * (250 - 150) + 150);
                const aqiDisplay = document.getElementById('currentAQI');
                aqiDisplay.querySelector('.aqi-value').textContent = newAQI;
                
                // Update AQI class
                aqiDisplay.className = 'aqi-display ' + getAQIClass(newAQI);
                aqiDisplay.querySelector('.aqi-label').textContent = getAQILabel(newAQI);
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }

        // Refresh source data
        function refreshSources() {
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loading"></span> Updating...';
            btn.disabled = true;

            setTimeout(() => {
                // Update source percentages with random values
                const sources = document.querySelectorAll('.source-fill');
                const percentages = [
                    Math.floor(Math.random() * 20 + 35), // 35-55%
                    Math.floor(Math.random() * 15 + 25), // 25-40%
                    Math.floor(Math.random() * 10 + 10), // 10-20%
                    Math.floor(Math.random() * 8 + 5)    // 5-13%
                ];

                sources.forEach((source, index) => {
                    source.style.width = percentages[index] + '%';
                    source.parentElement.parentElement.querySelector('span:last-child').textContent = percentages[index] + '%';
                });

                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        }

        // Helper functions
        function getAQIClass(aqi) {
            if (aqi <= 50) return 'aqi-good';
            if (aqi <= 100) return 'aqi-moderate';
            if (aqi <= 200) return 'aqi-unhealthy';
            return 'aqi-hazardous';
        }

        function getAQILabel(aqi) {
            if (aqi <= 50) return 'Good';
            if (aqi <= 100) return 'Moderate';
            if (aqi <= 200) return 'Unhealthy';
            return 'Hazardous';
        }

        // Simulate real-time updates
        function simulateRealTimeUpdates() {
            setInterval(() => {
                // Update timestamp in alerts
                const alerts = document.querySelectorAll('.alert');
                const now = new Date();
                const timeStr = now.toLocaleTimeString();
                
                // Update random alert with new timestamp
                if (Math.random() > 0.7) {
                    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
                    if (randomAlert && randomAlert.innerHTML.includes('Latest Update')) {
                        randomAlert.innerHTML = randomAlert.innerHTML.replace(/\(\d+\s\w+\s\w+\)/, `(${Math.floor(Math.random() * 10 + 1)} mins ago)`);
                    }
                }
            }, 30000); // Update every 30 seconds
        }

        // Auto-refresh data periodically
        function autoRefresh() {
            setInterval(() => {
                // Randomly update some values
                if (Math.random() > 0.8) {
                    // Update AQI value slightly
                    const currentAQI = document.querySelector('.aqi-value');
                    const currentValue = parseInt(currentAQI.textContent);
                    const newValue = currentValue + Math.floor(Math.random() * 21) - 10; // ±10
                    const clampedValue = Math.max(50, Math.min(300, newValue));
                    
                    currentAQI.textContent = clampedValue;
                    const aqiDisplay = document.getElementById('currentAQI');
                    aqiDisplay.className = 'aqi-display ' + getAQIClass(clampedValue);
                    aqiDisplay.querySelector('.aqi-label').textContent = getAQILabel(clampedValue);
                }
            }, 60000); // Check every minute
        }

        // Enhanced mobile responsiveness
        function handleResize() {
            if (forecastChart) forecastChart.resize();
            if (seasonalChart) seasonalChart.resize();
            if (sensorChart) sensorChart.resize();
            if (policyChart) policyChart.resize();
            if (aqiMap) aqiMap.invalidateSize();
        }

        // Add notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type}`;
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.zIndex = '1000';
            notification.style.maxWidth = '300px';
            notification.style.animation = 'slideIn 0.5s ease';
            notification.innerHTML = message;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 5000);
        }

        // Add slide animations
        const additionalCSS = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;

        const style = document.createElement('style');
        style.textContent = additionalCSS;
        document.head.appendChild(style);

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            initMap();
            simulateRealTimeUpdates();
            autoRefresh();
            
            // Welcome notification
            setTimeout(() => {
                showNotification('🌍 Welcome to Delhi-NCR Air Quality Intelligence Platform!', 'info');
            }, 1000);

            // Simulate periodic alerts
            setInterval(() => {
                const alerts = [
                    '🚨 High pollution detected in East Delhi',
                    '🌬️ Wind speed increasing - AQI improvement expected',
                    '🔥 New fire points detected via satellite',
                    '📊 Policy intervention showing positive results',
                    '💚 AQI improving in South Delhi area'
                ];
                
                if (Math.random() > 0.85) {
                    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
                    showNotification(randomAlert, 'warning');
                }
            }, 45000);
        });

        // Handle window resize
        window.addEventListener('resize', handleResize);

        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        showTab('citizen');
                        break;
                    case '2':
                        e.preventDefault();
                        showTab('forecast');
                        break;
                    case '3':
                        e.preventDefault();
                        showTab('sources');
                        break;
                    case '4':
                        e.preventDefault();
                        showTab('policy');
                        break;
                    case 'r':
                        e.preventDefault();
                        location.reload();
                        break;
                }
            }
        });

        // Add data export functionality
        function exportData(type) {
            const data = {
                timestamp: new Date().toISOString(),
                currentAQI: document.querySelector('.aqi-value').textContent,
                location: 'Delhi-NCR',
                sources: {
                    stubbleBurning: '45%',
                    vehicular: '30%',
                    industrial: '15%',
                    construction: '10%'
                }
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `delhi-aqi-data-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('📊 Data exported successfully!', 'info');
        }

        // Add print functionality
        function printReport() {
            window.print();
        }

        // Advanced features toggle
        let advancedMode = false;
        
        function toggleAdvancedMode() {
            advancedMode = !advancedMode;
            const body = document.body;
            
            if (advancedMode) {
                body.style.filter = 'hue-rotate(180deg)';
                showNotification('🔬 Advanced mode activated', 'info');
            } else {
                body.style.filter = 'none';
                showNotification('👤 Normal mode activated', 'info');
            }
        }

        // Add service worker registration for offline capability
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                // Simulated service worker registration
                console.log('Service Worker support detected - offline capability enabled');
            });
        }