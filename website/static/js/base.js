document.addEventListener('DOMContentLoaded', function () {
    const clearButtons = document.querySelectorAll('.clear-btn');

    clearButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = '';
        });
    });
    
    function expandText(input) {
        if (!input.originalWidth) {
            input.originalWidth = input.style.width;
        }
        if (input.style.whiteSpace === 'nowrap') {
            input.style.whiteSpace = 'normal';
            input.style.overflow = 'visible';
            input.style.textOverflow = 'clip';
            input.style.width = 'auto';
        } else {
            input.style.whiteSpace = 'nowrap';
            input.style.overflow = 'hidden';
            input.style.textOverflow = 'ellipsis';
            input.style.width = input.originalWidth;
        }
    }
    

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        // location.reload();
    });

    (function() {
        var alertBox = document.querySelector('.custom-alert');
        if (alertBox) {
            var progressBar = alertBox.querySelector('.notif-progress');
            if (progressBar) {
                progressBar.style.animation = 'runProgress-mes 2.7s linear forwards';
            }
            setTimeout(function() {
                alertBox.classList.add('show');
            }, 100); 
    
            setTimeout(function() {
                alertBox.classList.remove('show');
                alertBox.classList.add('hidden');
            }, 2700); 
        }
    })();
    

    const userImgs = document.querySelectorAll('.icon_black, .icon_white');
    const user_hover_navigation = document.getElementById('user_hover_navigation');
    let timeoutId;

    function showUserHoverNavigation() {
        if (user_hover_navigation) {
            user_hover_navigation.classList.remove('hidden');
            user_hover_navigation.classList.add('show');
        }
    }

    function hideUserHoverNavigation() {
        if (user_hover_navigation) {
            user_hover_navigation.classList.remove('show');
            user_hover_navigation.classList.add('hidden');
        }
    }

    function setupEventListeners(element) {
        element.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            showUserHoverNavigation();
        });

        element.addEventListener('mouseleave', function() {
            timeoutId = setTimeout(hideUserHoverNavigation, 1000);
        });
    }

    if (userImgs.length > 0 && user_hover_navigation) {
        userImgs.forEach(setupEventListeners);

        user_hover_navigation.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            showUserHoverNavigation();
        });

        user_hover_navigation.addEventListener('mouseleave', function() {
            timeoutId = setTimeout(hideUserHoverNavigation, 1000);
        });
    }
    


    var numericInputs = document.querySelectorAll('.numericInput');
    numericInputs.forEach(function(input) {
        input.addEventListener('input', function(event) {
            this.value = this.value.replace(/\D/g, '');
        });
    });

    var numeric_dotInputs = document.querySelectorAll('.numeric_dotInput');

    numeric_dotInputs.forEach(function(input) {
        input.addEventListener('input', function(event) {
            var oldValue = this.value;
            var selectionStart = this.selectionStart;
            var selectionEnd = this.selectionEnd;
            
            var value = oldValue.replace(/[^\d.]/g, '');
            var parts = value.split('.');
            if (parts.length > 1) {
                value = parts[0] + '.' + parts[1].slice(0, 2);
            }
            
            if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
                value = value.substring(1);
            }
    
            if (!value.includes('.')) {
                value += '.00';
            }

            var oldDotIndex = oldValue.indexOf('.');
            var newDotIndex = value.indexOf('.');
    
            this.value = value;
    

            if (selectionEnd - selectionStart > 1) {
                this.setSelectionRange(selectionEnd, selectionEnd);
            } else if (selectionStart <= oldDotIndex) {
                var cursorPos = selectionStart + (newDotIndex - oldDotIndex);
                this.setSelectionRange(cursorPos, cursorPos);
            } else {
                this.setSelectionRange(selectionStart, selectionStart);
            }
        });
    
        input.addEventListener('focus', function(event) {
            if (this.value === '') {
                this.value = '0.00';
            }
    
            var dotIndex = this.value.indexOf('.');
            if (dotIndex !== -1) {
                this.setSelectionRange(dotIndex, dotIndex);
            }
        });
    
        input.addEventListener('click', function(event) {
            this.select();
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const headers = document.querySelectorAll(".change-position");
    headers.forEach(header => {
        const modal = header.closest('.modal-content');

        let isDragging = false;
        let startX, startY, initialX, initialY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = modal.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            modal.style.position = "absolute";
            modal.style.margin = 0;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                modal.style.left = `${initialX + dx}px`;
                modal.style.top = `${initialY + dy}px`;
            }
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = 'auto';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.table_report-area');
    const thElements = table.querySelectorAll('th.resizable');
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    let currentTh = null;

    thElements.forEach(th => {
        const resizer = th.querySelector('.resizer');
        if (resizer) {
            resizer.addEventListener('mousedown', function(e) {
                isResizing = true;
                startX = e.clientX;
                startWidth = th.offsetWidth;
                currentTh = th;
                document.body.style.cursor = 'col-resize';
                e.preventDefault();
            });
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isResizing) {
            const newWidth = startWidth + (e.clientX - startX);
            currentTh.style.width = newWidth + 'px';
            currentTh.style.minWidth = newWidth + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
        }
    });

});

let sortOrder = 'asc';
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector(".table_report-area tbody");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < (rows.length - 3 - 1); i++) {
            shouldSwitch = false;
            var input1 = rows[i].querySelector('input[name="row_total_differents"]');
            var input2 = rows[i + 1].querySelector('input[name="row_total_differents"]');
            if (input1 && input2) {
                x = input1.value;
                y = input2.value;
                if (sortOrder === 'asc') {
                    if (parseFloat(x) > parseFloat(y)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (parseFloat(x) < parseFloat(y)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                console.error("One of the inputs is missing. Check the 'name' attribute.");
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        } else {
            sortOrder = (sortOrder === 'asc') ? 'desc' : 'asc';
        }
    }
    console.log('end');
    
}
