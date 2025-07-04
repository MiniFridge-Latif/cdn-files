
document.addEventListener('DOMContentLoaded', () => {
        
        // 2. HTML content
    const tagHTML = `
      <div id="connectionStatusBanner" class="connection-status-banner">
        <i class="fas fa-wifi me-2"></i> Device Disconnected. Attempting to reconnect...
    </div>
    
    <div id="connectionIndicator" class="connection-indicator disconnected">
        <span class="indicator-dot"></span>
        <span class="status-text">Disconnected</span>
    </div>
    
    <div class="toast-container position-fixed top-0 end-0 p-3"></div>

    <div class="container-fluid">
        <header class="text-center my-3">
            <h1><i class="fas fa-temperature-low me-2"></i>ESP8266 Pro Thermo Controller</h1>
        </header>

        <ul class="nav nav-pills mb-4 justify-content-center" id="mainTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#dashboard-panel" type="button">
                    <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#settings-panel" type="button">
                    <i class="fas fa-sliders-h me-2"></i>Settings
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="logs-tab-button" data-bs-toggle="tab" data-bs-target="#logs-panel" type="button">
                    <i class="fas fa-chart-line me-2"></i>Logs & Charts
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="system-tab-button" data-bs-toggle="tab" data-bs-target="#system-panel" type="button">
                    <i class="fas fa-cogs me-2"></i>System
                </button>
            </li>
        </ul>

        <div class="tab-content" id="mainTabsContent">
            <!-- Dashboard Panel -->
            <div class="tab-pane fade show active" id="dashboard-panel" role="tabpanel">
                <div class="row">
                    <div class="col-lg-8 mb-4">
                        <div class="card h-100">
                            <div class="card-header">
                                <i class="fas fa-thermostat me-2"></i>System Overview
                            </div>
                            <div class="card-body p-3">
                                <div class="status-grid">
                                    <div class="status-item">
                                        <div class="status-icon">
                                            <i class="fas fa-temperature-half"></i>
                                        </div>
                                        <div class="status-label">Temperature</div>
                                        <div id="currentTemp" class="status-value">-- °C</div>
                                    </div>
                                    <div class="status-item">
                                        <div class="status-icon">
                                            <i class="fas fa-toggle-on"></i>
                                        </div>
                                        <div class="status-label">Peltier Status</div>
                                        <div id="peltierStatus" class="status-value">--</div>
                                    </div>
                                    <div class="status-item">
                                        <div class="status-icon">
                                            <i class="fas fa-cogs"></i>
                                        </div>
                                        <div class="status-label">Device Mode</div>
                                        <div id="deviceMode" class="status-value">--</div>
                                    </div>
                                    <div class="status-item">
                                        <div class="status-icon">
                                            <i class="fas fa-bell"></i>
                                        </div>
                                        <div class="status-label">System Alert</div>
                                        <div id="systemAlert" class="status-value">--</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100">
                            <div class="card-header">
                                <i class="far fa-clock me-2"></i>Time Sync
                            </div>
                            <div class="card-body p-3 d-flex flex-column">
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between">
                                        <span>Browser Time:</span>
                                        <strong id="browserTime">--</strong>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <span>ESP Time:</span>
                                        <strong id="espTime">--</strong>
                                    </div>
                                </div>
                                <p class="text-muted small mb-3" id="timeSyncNotice"></p>
                                <button class="btn btn-warning w-100 mt-auto" id="syncTimeBtn">
                                    <i class="fas fa-history me-2"></i>Sync ESP with Browser
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Settings Panel -->
            <div class="tab-pane fade" id="settings-panel" role="tabpanel">
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-tools me-2"></i>Controller Configuration
                    </div>
                    <div class="card-body p-lg-4">
                        <form id="settingsForm">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h5 class="mb-3"><i class="fas fa-snowflake text-info me-2"></i>Cold Mode</h5>
                                    <div class="row g-3 mb-4">
                                        <div class="col-md-6">
                                            <label class="form-label">Stop Temp</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="cMT">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Resume Temp</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="cRT">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">High Warn</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="cHW">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Low Warn</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="cLW">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-lg-6">
                                    <h5 class="mb-3"><i class="fas fa-fire text-danger me-2"></i>Hot Mode</h5>
                                    <div class="row g-3 mb-4">
                                        <div class="col-md-6">
                                            <label class="form-label">Stop Temp</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="hMT">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Resume Temp</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="hRT">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">High Warn</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="hHW">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Low Warn</label>
                                            <div class="input-group">
                                                <input type="number" step="0.1" class="form-control" name="hLW">
                                                <span class="input-group-text">°C</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <hr class="my-4">
                            
                            <h5 class="mb-3"><i class="fas fa-file-signature me-2"></i>General & Logging</h5>
<div class="row g-3">
    <div class="col-md-6">
        <label class="form-label">Log Temp Delta</label>
        <div class="input-group">
            <input type="number" step="0.1" class="form-control" name="tDL">
            <span class="input-group-text">Δ°C</span>
        </div>
    </div>
    <div class="col-md-6">
        <label class="form-label">Sensor Interval</label>
        <div class="input-group">
            <input type="number" step="100" class="form-control" name="sI">
            <span class="input-group-text">ms</span>
        </div>
    </div>
    <!-- NEW AUTO-UPDATE SWITCH -->
    <div class="col-md-6 mt-4">
        <div class="form-check form-switch form-check-lg">
            <input class="form-check-input" type="checkbox" role="switch" id="autoUpdateSwitch" name="aU">
            <label class="form-check-label" for="autoUpdateSwitch">Auto-Update on Startup</label>
        </div>
    </div>
</div>
                                                            
                            <div class="d-flex gap-2 mt-4">
                                <button type="submit" class="btn btn-success flex-grow-1">
                                    <i class="fas fa-save me-2"></i>Save Settings
                                </button>
                                <button type="button" id="reloadSettingsBtn" class="btn btn-outline-primary flex-grow-1">
                                    <i class="fas fa-redo-alt me-2"></i>Reload Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Logs Panel -->
            <div class="tab-pane fade" id="logs-panel" role="tabpanel">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div>
                            <i class="far fa-list-alt me-2"></i>System Logs & Charts
                        </div>
                        <button class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteLogsModal">
                            <i class="fas fa-trash-alt me-1"></i>Manage Logs
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-center mb-4">
                            <div class="col-lg-8">
                                <div class="btn-group w-100" role="group">
                                    <input type="radio" class="btn-check" name="logtype" id="tempLogBtn" data-log-key="tmlog" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="tempLogBtn">
                                        <i class="fas fa-chart-line me-2"></i>Temperature
                                    </label>
                                    <input type="radio" class="btn-check" name="logtype" id="opLogBtn" data-log-key="oplog" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="opLogBtn">
                                        <i class="fas fa-history me-2"></i>Operations
                                    </label>
                                    <input type="radio" class="btn-check" name="logtype" id="warnLogBtn" data-log-key="warnlog" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="warnLogBtn">
                                        <i class="fas fa-exclamation-triangle me-2"></i>Warnings
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-4 mt-3 mt-lg-0">
                                <select class="form-select" id="logDateFilter">
                                    <option value="0">All Time</option>
                                    <option value="1">Last 24 Hours</option>
                                    <option value="3">Last 3 Days</option>
                                    <option value="7">Last 7 Days</option>
                                    <option value="30">Last 30 Days</option>
                                    <option value="90">Last 90 Days</option>
                                </select>
                            </div>
                        </div>
                        
                        <div id="logLoadingSpinner" class="loading-spinner text-center py-5">
                            <div class="spinner-border text-primary" role="status"></div>
                            <p class="mt-3 text-muted">Loading logs...</p>
                        </div>
                        
                        <div class="temp-chart-container" id="tempChartContainer" style="display: none;">
                            <div id="tempChart"></div>
                        </div>
                        
                        <div id="logTableContainer" class="table-responsive" style="display: none;"></div>
                        
                        <div id="logPlaceholder" class="text-center py-5">
                            <i class="fas fa-chart-area text-muted fa-3x mb-3"></i>
                            <h5 class="text-muted">Select a log type to view data</h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- System Panel -->
            <div class="tab-pane fade" id="system-panel" role="tabpanel">
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header">
                                <i class="fas fa-wifi me-2"></i>WiFi Management
                            </div>
                            <div class="card-body">
                                <h6>Saved Networks</h6>
                                <div id="wifiListLoading" class="text-center p-3">
                                    <div class="spinner-border spinner-border-sm"></div>
                                </div>
                                <ul class="list-group list-group-flush mb-4" id="wifiList"></ul>
                                
                                <h6>Add or Update Network</h6>
                                <form id="addWifiForm">
                                    <div class="mb-2">
                                        <label class="form-label">SSID</label>
                                        <input type="text" class="form-control" id="wifiSsid" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Password</label>
                                        <input type="password" class="form-control" id="wifiPass">
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="fas fa-plus-circle me-2"></i>Add/Update WiFi
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header">
                                <i class="fas fa-cloud-arrow-up me-2"></i>Firmware Update
                            </div>
                            <div class="card-body">
                                <div class="text-center mb-3">
                                    <p class="mb-1">Current Onboard Version: <strong id="currentVersion">1.1.1</strong></p>
                                    <p class="mb-2">Latest Available Version: <strong id="githubVersion">Checking...</strong></p>
                                    <div id="updateAlert" class="mb-3"></div>
                                    <button class="btn btn-info" id="checkUpdateBtn">
                                        <i class="fas fa-sync-alt me-2"></i>Check for Updates
                                    </button>
                                </div>
                                
                                <hr>
                                
                                <h6>Install a specific version</h6>
                                <div class="mb-3">
                                    <label for="firmwareVersionSelect" class="form-label">Available Versions:</label>
                                    <select class="form-select" id="firmwareVersionSelect" disabled>
                                        <option selected disabled>Loading versions...</option>
                                    </select>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="button" class="btn btn-success" id="installLatestBtn" disabled>
                                        <i class="fas fa-arrow-alt-circle-up me-2"></i>Install Latest Version
                                    </button>
                                    <button type="button" class="btn btn-primary" id="installSelectedBtn" disabled>
                                        <i class="fas fa-download me-2"></i>Install Selected Version
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="text-center">ESP8266 Pro Thermo Controller v1.1.1</footer>
    </div>

    <!-- Delete Logs Modal -->
    <div class="modal fade" id="deleteLogsModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Manage Logs</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>Select what to delete. This action is irreversible.</p>
                    <div class="mb-4">
                        <div class="row">
                            <div class="col-md-4">
                                <label class="log-deletion-option w-100" for="deleteAllLogs">
                                    <input type="radio" name="deleteLogType" id="deleteAllLogs" value="all" checked>
                                    <div class="text-center">
                                        <i class="fas fa-dumpster-fire fa-2x mb-2 text-danger"></i>
                                        <h6>All Logs</h6>
                                        <p class="small text-muted mb-0">Delete all log files.</p>
                                    </div>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label class="log-deletion-option w-100" for="deleteByType">
                                    <input type="radio" name="deleteLogType" id="deleteByType" value="byType">
                                    <div class="text-center">
                                        <i class="fas fa-file-alt fa-2x mb-2 text-warning"></i>
                                        <h6>By File/Time</h6>
                                        <p class="small text-muted mb-0">Select a file and time range.</p>
                                    </div>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label class="log-deletion-option w-100" for="deleteByContent">
                                    <input type="radio" name="deleteLogType" id="deleteByContent" value="byContent">
                                    <div class="text-center">
                                        <i class="fas fa-filter fa-2x mb-2 text-primary"></i>
                                        <h6>By Content</h6>
                                        <p class="small text-muted mb-0">Delete specific warnings.</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div id="deleteByTypeOptions" class="d-none">
                        <h6 class="mb-2">Options</h6>
                        <div class="row g-2">
                            <div class="col-6">
                                <select class="form-select" id="logFileSelect">
                                    <option value="tmlog.jsonl">Temperature</option>
                                    <option value="oplog.jsonl">Operation</option>
                                    <option value="warnlog.jsonl">Warning</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <select class="form-select" id="timeRangeSelect">
                                    <option value="">Entire File</option>
                                    <option value="1h">Older than 1 hour</option>
                                    <option value="6h">Older than 6 hours</option>
                                    <option value="12h">Older than 12 hours</option>
                                    <option value="1d">Older than 1 day</option>
                                    <option value="7d">Older than 7 days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div id="deleteByContentOptions" class="d-none">
                        <h6 class="mb-2">Warning Type to Delete</h6>
                        <select class="form-select" id="warningTypeSelect">
                            <option value="h">High Temperature Warnings</option>
                            <option value="l">Low Temperature Warnings</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteLogsBtn">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `;

        const targetDiv = document.getElementById('container');
        if (targetDiv) {
            targetDiv.innerHTML = tagHTML;
        }
        // Configuration constants
        const ESP_HOST = "192.168.4.1";
        const UPDATE_API_BASE = "https://rgsglobalstudyservices.com/mini-fridge/api/";
        const CHECK_UPDATE_URL = UPDATE_API_BASE + "check_update.php";
        const LIST_VERSIONS_URL = UPDATE_API_BASE + "list_versions.php";
        
        // Application state
        const appState = {
            isConnected: false,
            websocket: null,
            reconnectTimer: null,
            tempChart: null,
            activeLogKey: null,
            logDateFilterDays: 0,
            logData: {
                tmlog: { entries: [], hasFetched: false },
                oplog: { entries: [], hasFetched: false },
                warnlog: { entries: [], hasFetched: false },
            },
            currentFirmwareVersion: "1.1.1",
            availableVersions: [],
            latestVersionInfo: null,
        };

        // DOM Elements reference
        const DOMElements = {
            connectionBanner: document.getElementById('connectionStatusBanner'),
            connectionIndicator: document.getElementById('connectionIndicator'),
            toastContainer: document.querySelector('.toast-container'),
            currentTemp: document.getElementById('currentTemp'),
            peltierStatus: document.getElementById('peltierStatus'),
            deviceMode: document.getElementById('deviceMode'),
            systemAlert: document.getElementById('systemAlert'),
            browserTime: document.getElementById('browserTime'),
            espTime: document.getElementById('espTime'),
            settingsForm: document.getElementById('settingsForm'),
            reloadSettingsBtn: document.getElementById('reloadSettingsBtn'),
            syncTimeBtn: document.getElementById('syncTimeBtn'),
            logTypeRadios: document.querySelectorAll('input[name="logtype"]'),
            logDateFilter: document.getElementById('logDateFilter'),
            logLoadingSpinner: document.getElementById('logLoadingSpinner'),
            logPlaceholder: document.getElementById('logPlaceholder'),
            tempChartContainer: document.getElementById('tempChartContainer'),
            logTableContainer: document.getElementById('logTableContainer'),
            wifiList: document.getElementById('wifiList'),
            wifiListLoading: document.getElementById('wifiListLoading'),
            addWifiForm: document.getElementById('addWifiForm'),
            currentVersion: document.getElementById('currentVersion'),
            firmwareUpdate: {
                githubVersion: document.getElementById('githubVersion'),
                updateAlert: document.getElementById('updateAlert'),
                checkUpdateBtn: document.getElementById('checkUpdateBtn'),
                firmwareVersionSelect: document.getElementById('firmwareVersionSelect'),
                installLatestBtn: document.getElementById('installLatestBtn'),
                installSelectedBtn: document.getElementById('installSelectedBtn'),
            },
            deleteLogsModal: {
                modal: new bootstrap.Modal(document.getElementById('deleteLogsModal')),
                confirmBtn: document.getElementById('confirmDeleteLogsBtn'),
                typeRadios: document.querySelectorAll('input[name="deleteLogType"]'),
                byTypeOptions: document.getElementById('deleteByTypeOptions'),
                byContentOptions: document.getElementById('deleteByContentOptions'),
                logFileSelect: document.getElementById('logFileSelect'),
                timeRangeSelect: document.getElementById('timeRangeSelect'),
                warningTypeSelect: document.getElementById('warningTypeSelect')
            }
        };

        // UI Controller with helper functions
        const ui = {
            // Map log headers to user-friendly names
            headersMap: {
                id: "ID",
                ts: "Timestamp",
                millis: "Uptime (ms)",
                evt: "Event",
                mth: "Method",
                m: "Mode",
                t: "Temp (°C)",
                wT: "Warn Type",
                st: "Peltier",
                l: "Limit (°C)"
            },
            
            // Show toast notification
            showToast(message, type = 'info') {
                const iconMap = {
                    success: 'fa-check-circle',
                    danger: 'fa-times-circle',
                    warning: 'fa-exclamation-triangle',
                    info: 'fa-info-circle'
                };
                
                const toast = document.createElement('div');
                toast.className = `toast align-items-center text-bg-${type} border-0`;
                toast.setAttribute('role', 'alert');
                toast.innerHTML = `
                    <div class="d-flex">
                        <div class="toast-body">
                            <i class="fas ${iconMap[type]} me-2"></i>${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                    </div>
                `;
                
                DOMElements.toastContainer.appendChild(toast);
                const toastInstance = new bootstrap.Toast(toast, { delay: 5000 });
                toastInstance.show();
                
                toast.addEventListener('hidden.bs.toast', () => {
                    toast.remove();
                });
            },
            
            // Update connection state UI
            setConnectionState(connected) {
                appState.isConnected = connected;
                DOMElements.connectionBanner.style.display = connected ? 'none' : 'block';
                
                const indicator = DOMElements.connectionIndicator;
                indicator.classList.toggle('connected', connected);
                indicator.classList.toggle('disconnected', !connected);
                indicator.querySelector('.status-text').textContent = connected ? 'Connected' : 'Disconnected';
                
                // Disable UI elements when disconnected
                document.body.querySelectorAll('button, input, select').forEach(el => {
                    if (el.id !== 'firmwareVersionSelect') { // Keep version selector enabled visually
                        el.disabled = !connected;
                    }
                });
                if(connected) {
                    DOMElements.firmwareUpdate.firmwareVersionSelect.disabled = !appState.availableVersions.length;
                    DOMElements.firmwareUpdate.installSelectedBtn.disabled = !DOMElements.firmwareUpdate.firmwareVersionSelect.value;
                    if(appState.latestVersionInfo && !appState.latestVersionInfo.latest) {
                       DOMElements.firmwareUpdate.installLatestBtn.disabled = false;
                    }
                }
            },
            
            // Update system status display
            updateStatus(data) {
                if (data.t !== 'error') {
                    DOMElements.currentTemp.textContent = `${parseFloat(data.t).toFixed(2)} °C`;
                } else {
                    DOMElements.currentTemp.textContent = 'Error';
                }
                
                if (data.pS) {
                    DOMElements.peltierStatus.textContent = data.pS[0].toUpperCase() + data.pS.slice(1);
                } else {
                    DOMElements.peltierStatus.textContent = '--';
                }
                
                if (data.m) {
                    const modeText = data.m.replace(/_/g, ' ')
                        .split(' ')
                        .map(w => w[0].toUpperCase() + w.slice(1))
                        .join(' ');
                    DOMElements.deviceMode.textContent = modeText;
                } else {
                    DOMElements.deviceMode.textContent = '--';
                }
                
                DOMElements.systemAlert.textContent = data.sA || 'None';
                DOMElements.espTime.textContent = data.time || 'Not Synced';
            },
            
            // Populate settings form with values
            populateSettings(settings) {
                for (const key in settings) {
                    const el = DOMElements.settingsForm.querySelector(`[name="${key}"]`);
                    if (el) el.value = settings[key];
                    if (key === 'current_version') {
                        DOMElements.currentVersion.textContent = settings[key];
                        appState.currentFirmwareVersion = settings[key];
                        // After getting current version, check for updates.
                        api.checkServerForUpdate();
                    }
                    if (key === 'aU') {
                        const el = DOMElements.settingsForm.querySelector(`[name="${key}"]`);
                        if (el) el.checked = settings[key]; // Use .checked for checkboxes
                    }
                }
            },
            
            // Render WiFi network list
            renderWifiList(networks) {
                DOMElements.wifiListLoading.style.display = 'none';
                DOMElements.wifiList.innerHTML = '';
                
                if (networks.length === 0) {
                    DOMElements.wifiList.innerHTML = '<li class="list-group-item text-center py-3">No saved networks found</li>';
                    return;
                }
                
                networks.forEach(({ ssid }) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                    listItem.innerHTML = `
                        <span><i class="fas fa-wifi text-primary me-2"></i>${ssid}</span>
                        <button class="btn btn-sm btn-outline-danger" data-ssid="${ssid}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    DOMElements.wifiList.appendChild(listItem);
                });
            },
            
            // Render the active log view based on selection
            renderLogView() {
                const logKey = appState.activeLogKey;
                if (!logKey) return;
                
                let { entries } = appState.logData[logKey];
                
                // Apply date filter if set
                if (appState.logDateFilterDays > 0) {
                    const cutoffDate = new Date();
                    cutoffDate.setDate(cutoffDate.getDate() - appState.logDateFilterDays);
                    const cutoffTimestamp = cutoffDate.getTime() / 1000;
                    entries = entries.filter(e => e.ts && e.ts >= cutoffTimestamp);
                }
                
                DOMElements.logPlaceholder.style.display = 'none';
                DOMElements.logLoadingSpinner.classList.remove('active');
                
                // Handle temperature log (chart view)
                if (logKey === 'tmlog') {
                    DOMElements.logTableContainer.style.display = 'none';
                    DOMElements.tempChartContainer.style.display = 'block';
                    this.renderTempChart(entries);
                } 
                // Handle other logs (table view)
                else {
                    if (appState.tempChart) {
                        appState.tempChart.destroy();
                        appState.tempChart = null;
                    }
                    DOMElements.tempChartContainer.style.display = 'none';
                    DOMElements.logTableContainer.style.display = 'block';
                    this.renderLogTable(entries, logKey);
                }
            },
            
            // Render temperature chart
            renderTempChart(entries) {
                const data = entries
                    .filter(entry => entry.ts)
                    .map(entry => ({
                        x: entry.ts * 1000,
                        y: entry.t === 'error' ? null : parseFloat(entry.t)
                    }));
                
                const options = {
                    series: [{
                        name: 'Temperature (°C)',
                        data: data
                    }],
                    chart: {
                        type: 'line',
                        height: 350,
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            speed: 300
                        },
                        zoom: {
                            enabled: true
                        }
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3
                    },
                    xaxis: {
                        type: 'datetime',
                        labels: {
                            datetimeUTC: false
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Temperature (°C)'
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd MMM yyyy - HH:mm:ss'
                        },
                        y: {
                            formatter: (value) => value ? `${value.toFixed(2)} °C` : 'Error'
                        }
                    },
                    noData: {
                        text: 'No temperature data for selected time range.'
                    }
                };
                
                if (appState.tempChart) {
                    appState.tempChart.updateOptions(options, true, true);
                } else {
                    appState.tempChart = new ApexCharts(document.querySelector("#tempChart"), options);
                    appState.tempChart.render();
                }
            },
            
            // Render log table
            renderLogTable(entries, logKey) {
                if (entries.length === 0) {
                    DOMElements.logTableContainer.innerHTML = `
                        <p class="text-muted text-center p-4">
                            No ${logKey.replace('log', '')} data for selected time range.
                        </p>
                    `;
                    return;
                }
                
                const allKeys = [...new Set(entries.flatMap(Object.keys))];
                
                let tableHTML = `
                    <table class="table table-sm table-striped table-hover log-table">
                        <thead>
                            <tr>
                                ${allKeys.map(header => `
                                    <th>${this.headersMap[header] || header}</th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                [...entries].reverse().forEach(entry => {
                    tableHTML += this.createTableRow(entry, allKeys);
                });
                
                tableHTML += '</tbody></table>';
                DOMElements.logTableContainer.innerHTML = tableHTML;
            },
            
            createTableRow(entry, keys) {
                const cells = keys.map(key => {
                    let value = entry[key] ?? 'N/A';
                    
                    switch (key) {
                        case 'ts':
                            value = new Date(value * 1000).toLocaleString();
                            break;
                        case 'm':
                            value = { c: 'Cold', h: 'Hot', off: 'Off' }[value] || value;
                            break;
                        case 'wT':
                            value = { h: 'High', l: 'Low' }[value] || value;
                            break;
                        case 'mth':
                            if (value === 'ext') value = '<span class="badge badge-log badge-log-ext">External</span>';
                            else if (value === 'int') value = '<span class="badge badge-log badge-log-int">Internal</span>';
                            else if (value === 'N/A') value = '';
                            break;
                        case 'evt':
                            if (value === 'ON') value = '<span class="badge bg-success">ON</span>';
                            else if (value === 'OFF') value = '<span class="badge bg-secondary">OFF</span>';
                            else if (value === 'START') value = '<span class="badge bg-success">START</span>';
                            else if (value === 'STOP') value = '<span class="badge bg-danger">STOP</span>';
                            else if (value === 'WARN_HIGH') value = '<span class="badge bg-danger">WARN: High</span>';
                            else if (value === 'WARN_LOW') value = '<span class="badge bg-warning text-dark">WARN: Low</span>';
                            break;
                    }
                    
                    return `<td>${value}</td>`;
                }).join('');
                
                return `<tr>${cells}</tr>`;
            },
            
            prependLogEntry(logKey, entry) {
                if (logKey === 'tmlog') {
                    if (appState.tempChart) this.renderLogView();
                } else {
                    const tableBody = DOMElements.logTableContainer.querySelector('tbody');
                    if (!tableBody) return;
                    
                    const keys = Array.from(DOMElements.logTableContainer.querySelectorAll('th'))
                        .map(header => Object.keys(this.headersMap)
                            .find(x => this.headersMap[x] === header.textContent) || header.textContent.toLowerCase());
                    
                    const newRow = tableBody.insertRow(0);
                    newRow.className = 'new-entry';
                    newRow.innerHTML = this.createTableRow(entry, keys);
                }
            },

            populateVersionSelector(versions) {
                const selector = DOMElements.firmwareUpdate.firmwareVersionSelect;
                selector.innerHTML = '<option value="" selected disabled>Select a version to install</option>';

                versions.forEach(v => {
                    const option = document.createElement('option');
                    option.value = v.version;
                    let text = `v${v.version} - ${v.description}`;
                    if (v.is_latest) {
                        text += " (Latest)";
                    }
                    option.textContent = text;
                    selector.appendChild(option);
                });
                
                selector.disabled = false;
            }
        };

        // API communication functions
        const api = {
            async request(endpoint, options = {}) {
                try {
                    const response = await fetch(`http://${ESP_HOST}${endpoint}`, options);
                    
                    if (!response.ok) {
                        if (endpoint.startsWith('/logs') && response.status === 404) return [];
                        const errorData = await response.json().catch(() => ({ error: `HTTP Error ${response.status}` }));
                        throw new Error(errorData.error);
                    }
                    
                    return response.json().catch(() => ({}));
                } catch (err) {
                    ui.showToast(`API Error: ${err.message}`, 'danger');
                    if (err instanceof TypeError) ws.disconnect();
                    throw err;
                }
            },
            
            post(endpoint, body) {
                return this.request(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            },
            
            async checkServerForUpdate() {
                const fw = DOMElements.firmwareUpdate;
                fw.githubVersion.textContent = "Checking...";
                fw.installLatestBtn.disabled = true;

                try {
                    const response = await fetch(CHECK_UPDATE_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ version: appState.currentFirmwareVersion })
                    });
                    
                    if (!response.ok) throw new Error(`API Error: ${response.status}`);
                    
                    const data = await response.json();
                    if (!data.success) throw new Error(data.message || 'API returned an error.');

                    appState.latestVersionInfo = data;
                    fw.githubVersion.textContent = data.latest_version;
                    
                    if (data.latest) {
                        fw.updateAlert.innerHTML = `<div class="alert alert-info mb-0">You are on the latest version.</div>`;
                        fw.installLatestBtn.disabled = true;
                    } else {
                        fw.updateAlert.innerHTML = `<div class="alert alert-success mb-0">New version ${data.latest_version} is available!</div>`;
                        fw.installLatestBtn.disabled = !appState.isConnected;
                    }

                } catch (error) {
                    fw.githubVersion.textContent = "Error";
                    fw.updateAlert.innerHTML = `<div class="alert alert-danger mb-0">Update check failed: ${error.message}</div>`;
                }
            },

            async listFirmwareVersions() {
                try {
                    const response = await fetch(LIST_VERSIONS_URL);
                    if (!response.ok) throw new Error(`API Error: ${response.status}`);
                    
                    const data = await response.json();
                    if (!data.success) throw new Error(data.message || 'API returned an error.');

                    appState.availableVersions = data.versions;
                    ui.populateVersionSelector(data.versions);

                } catch (error) {
                    console.error("Failed to list firmware versions:", error);
                    DOMElements.firmwareUpdate.firmwareVersionSelect.innerHTML = '<option selected disabled>Error loading versions</option>';
                }
            }
        };

        // WebSocket communication controller
        const ws = {
            connect() {
                if (appState.websocket && appState.websocket.readyState === WebSocket.OPEN) return;
                
                appState.websocket = new WebSocket(`ws://${ESP_HOST}/ws`);
                
                appState.websocket.onopen = () => {
                    console.log('WebSocket Connected');
                    ui.setConnectionState(true);
                    clearTimeout(appState.reconnectTimer);
                    this.send({ command: "getInitialData" });
                };
                
                appState.websocket.onclose = () => {
                    console.log('WebSocket Disconnected');
                    ui.setConnectionState(false);
                    clearTimeout(appState.reconnectTimer);
                    appState.reconnectTimer = setTimeout(() => this.connect(), 3000);
                };
                
                appState.websocket.onerror = (error) => {
                    console.error('WebSocket Error:', error);
                    appState.websocket.close();
                };
                
                appState.websocket.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        this.handleMessage(message);
                    } catch (err) {
                        console.error('Failed to parse WS message:', event.data);
                    }
                };
            },
            
            disconnect() {
                if (appState.websocket) {
                    appState.websocket.close();
                }
            },
            
            send(payload) {
                if (appState.isConnected) {
                    appState.websocket.send(JSON.stringify(payload));
                }
            },
            
            handleMessage(message) {
                switch (message.type) {
                    case 'initialData':
                        ui.populateSettings(message.settings);
                        ui.updateStatus(message.status);
                        break;
                    case 'status':
                        ui.updateStatus(message);
                        break;
                    case 'logEntryAdded':
                        let logKey;
                        if (message.logType === 'temperature') logKey = 'tmlog';
                        else if (message.logType === 'operation') logKey = 'oplog';
                        else if (message.logType === 'warning') logKey = 'warnlog';
                        else return;
                        
                        if (appState.logData[logKey]) {
                            appState.logData[logKey].entries.push(message.data);
                            if (appState.activeLogKey === logKey) ui.prependLogEntry(logKey, message.data);
                        }
                        break;
                    case 'logReset':
                        ui.showToast('Log data was cleared on device.', 'warning');
                        message.logFiles.forEach(file => {
                            const key = file.substring(0, 2) + 'log';
                            if (appState.logData[key]) appState.logData[key] = { entries: [], hasFetched: false };
                        });
                        if (appState.activeLogKey && message.logFiles.some(file => file.startsWith(appState.activeLogKey.substring(0, 2)))) {
                            controller.showActiveLog();
                        }
                        break;
                    case 'connection':
                        console.log("ESP connection confirmation received.");
                        break;
                    case 'info':
                    case 'warning':
                    case 'error':
                        ui.showToast(message.message, message.type);
                        break;
                    default:
                        console.log("Unknown WS message type:", message.type);
                }
            }
        };

        // Main application controller
        const controller = {
            async showActiveLog() {
                const logKey = appState.activeLogKey;
                if (!logKey) return;
                
                if (appState.logData[logKey].hasFetched) {
                    ui.renderLogView();
                } 
                else {
                    DOMElements.logLoadingSpinner.classList.add('active');
                    DOMElements.logPlaceholder.style.display = 'none';
                    DOMElements.logTableContainer.style.display = 'none';
                    DOMElements.tempChartContainer.style.display = 'none';
                    
                    try {
                        const entries = await api.request(`/logs?file=${logKey}.jsonl&limit=30`);
                        appState.logData[logKey].entries = Array.isArray(entries) ? entries : [];
                        appState.logData[logKey].hasFetched = true;
                        ui.renderLogView();
                    } catch (error) {
                        console.error(`Failed to fetch ${logKey}`, error);
                        DOMElements.logLoadingSpinner.classList.remove('active');
                        DOMElements.logPlaceholder.style.display = 'block';
                        DOMElements.logPlaceholder.innerHTML = `<i class="fas fa-times-circle text-danger fa-3x mb-3"></i><h5 class="text-muted">Could not load log data</h5>`;
                    }
                }
            },
            
            initEventListeners() {
                // Settings form submission
                DOMElements.settingsForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const settings = {};
                    formData.forEach((value, key) => { 
                        if (key !== 'aU') {
                            settings[key] = parseFloat(value);
                        }
                    });
                    // Manually add the checkbox state (it won't be in formData if unchecked)
                    const autoUpdateSwitch = e.target.querySelector('[name="aU"]');
                    settings['aU'] = autoUpdateSwitch.checked; // This will be true or false

                    console.log("Saving settings:", settings); // For debugging
                    
                    ui.showToast('Saving settings...', 'info');
                    await api.post('/settings', settings);
                });
                
                // Reload settings button
                DOMElements.reloadSettingsBtn.addEventListener('click', () => {
                    api.request('/settings').then(ui.populateSettings).then(() => ui.showToast('Settings reloaded.', 'info'));
                });
                
                // Time sync button
                DOMElements.syncTimeBtn.addEventListener('click', () => {
                    api.post('/synctime', { epoch: Math.floor(Date.now() / 1000) })
                    .then(() => ui.showToast('Time synchronized successfully', 'success'))
                    .catch(() => ui.showToast('Time sync failed', 'danger'));
                });
                
                // Log type radio buttons
                DOMElements.logTypeRadios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        appState.activeLogKey = radio.dataset.logKey;
                        this.showActiveLog();
                    });
                });
                
                // Log date filter
                DOMElements.logDateFilter.addEventListener('change', (e) => {
                    appState.logDateFilterDays = parseInt(e.target.value, 10);
                    if (appState.activeLogKey) ui.renderLogView();
                });
                
                // Log deletion modal
                DOMElements.deleteLogsModal.typeRadios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        DOMElements.deleteLogsModal.byTypeOptions.classList.toggle('d-none', radio.value !== 'byType');
                        DOMElements.deleteLogsModal.byContentOptions.classList.toggle('d-none', radio.value !== 'byContent');
                    });
                });
                DOMElements.deleteLogsModal.confirmBtn.addEventListener('click', () => {
                    const type = document.querySelector('input[name="deleteLogType"]:checked').value;
                    const payload = { command: 'deleteLogs', type };
                    if (type === 'byType') {
                        payload.specificFile = DOMElements.deleteLogsModal.logFileSelect.value;
                        payload.timeFilter = DOMElements.deleteLogsModal.timeRangeSelect.value;
                    } else if (type === 'byContent') {
                        payload.specificFile = 'warnlog.jsonl';
                        payload.timeFilter = DOMElements.deleteLogsModal.warningTypeSelect.value;
                    }
                    ws.send(payload);
                    DOMElements.deleteLogsModal.modal.hide();
                });
                
                // WiFi Management
                DOMElements.addWifiForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    await api.post('/addwifi', { ssid: e.target.wifiSsid.value, password: e.target.wifiPass.value });
                    ui.showToast(`Network "${e.target.wifiSsid.value}" added/updated.`, 'success');
                    api.request('/listwifi').then(ui.renderWifiList);
                    e.target.reset();
                });
                DOMElements.wifiList.addEventListener('click', async (e) => {
                    const button = e.target.closest('button');
                    if (button && confirm(`Delete WiFi network "${button.dataset.ssid}"?`)) {
                        await api.post('/deletewifi', { ssid: button.dataset.ssid });
                        ui.showToast(`Network "${button.dataset.ssid}" deleted.`, 'success');
                        api.request('/listwifi').then(ui.renderWifiList);
                    }
                });

                // Firmware Update Listeners
                const fw = DOMElements.firmwareUpdate;
                fw.checkUpdateBtn.addEventListener('click', api.checkServerForUpdate);
                
                fw.installLatestBtn.addEventListener('click', () => {
                    const { latest_version, download_url } = appState.latestVersionInfo;
                    if (latest_version && download_url && confirm(`Update to latest version ${latest_version}?\nThe device will restart.`)) {
                        ui.showToast(`Update to v${latest_version} initiated...`, 'warning');
                        api.post('/update', { url: download_url, version: latest_version });
                    }
                });

                fw.installSelectedBtn.addEventListener('click', () => {
                    const selectedVersion = fw.firmwareVersionSelect.value;
                    const versionData = appState.availableVersions.find(v => v.version === selectedVersion);
                    if (versionData && confirm(`Install version ${versionData.version}?\nThe device will restart.`)) {
                        ui.showToast(`Update to v${versionData.version} initiated...`, 'warning');
                        api.post('/update', { url: versionData.bin_url, version: versionData.version });
                    }
                });

                fw.firmwareVersionSelect.addEventListener('change', (e) => {
                    fw.installSelectedBtn.disabled = !e.target.value;
                });
                
                // System tab shown event
                document.getElementById('system-tab-button').addEventListener('shown.bs.tab', () => {
                    DOMElements.wifiListLoading.style.display = 'block';
                    DOMElements.wifiList.innerHTML = '';
                    api.request('/listwifi').then(ui.renderWifiList);
                    api.listFirmwareVersions();
                });
            },
            
            init() {
                setInterval(() => { DOMElements.browserTime.textContent = new Date().toLocaleTimeString(); }, 1000);
                this.initEventListeners();
                ws.connect();
                this.syncTime();
                // Check for updates on load, but will be re-checked when version is confirmed via WebSocket
                api.checkServerForUpdate();
            },
            
            syncTime() {
                api.post('/synctime', { epoch: Math.floor(Date.now() / 1000) })
                .then(response => console.log('Time synced successfully:', response))
                .catch(error => console.error('Time sync failed:', error));
            }
        };

        controller.init();
    });

