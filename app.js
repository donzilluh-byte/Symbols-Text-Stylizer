        // ===== FLOATING WINDOW MANAGEMENT =====
        let draggedWindow = null;
        let offsetX = 0;
        let offsetY = 0;

        function toggleWindow(windowId) {
            const window = document.getElementById(windowId);
            window.classList.toggle('active');
            const btn = document.querySelector(`[onclick*="${windowId}"]`);
            if (btn) btn.classList.toggle('active');
        }

        document.querySelectorAll('.float-header').forEach(header => {
            header.addEventListener('mousedown', (e) => {
                draggedWindow = header.closest('.floating-window');
                const rect = draggedWindow.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (draggedWindow) {
                draggedWindow.style.left = (e.clientX - offsetX) + 'px';
                draggedWindow.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            draggedWindow = null;
        });

        window.toggleWindow = toggleWindow;

        // ===== TEXT TRANSFORMATION FUNCTIONS =====
        
        const textStyles = {
            strikethrough: (text) => {
                return text.split('').map(char => char + '\u0336').join('');
            },
            overline: (text) => {
                return text.split('').map(char => char + '\u0305').join('');
            },
            zalgo: (text) => {
                const top = ['\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F', '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u033D', '\u033E', '\u033F', '\u0340', '\u0341', '\u0342', '\u0343', '\u0344', '\u0346', '\u034A', '\u034B', '\u034C', '\u0350', '\u0351', '\u0352', '\u0357', '\u0358', '\u0359', '\u035A', '\u035B', '\u035C', '\u035D', '\u035E', '\u035F', '\u0360', '\u0361', '\u0362', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036A', '\u036B', '\u036C', '\u036D', '\u036E', '\u036F'];
                const mid = ['\u0315', '\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F', '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D', '\u032E', '\u032F', '\u0330', '\u0331', '\u0332', '\u0333', '\u0334', '\u0335', '\u0337', '\u0338', '\u0345', '\u031F', '\u0340', '\u0341', '\u0342', '\u0360', '\u0361'];
                
                return text.split('').map(char => {
                    let result = char;
                    for (let i = 0; i < 3; i++) {
                        result += top[Math.floor(Math.random() * top.length)];
                    }
                    for (let i = 0; i < 2; i++) {
                        result += mid[Math.floor(Math.random() * mid.length)];
                    }
                    return result;
                }).join('');
            },
            superscript: (text) => {
                const map = {
                    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵍ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
                    'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'ᵠ', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ᴱ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
                    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
                };
                return text.split('').map(char => map[char] || char).join('');
            },
            subscript: (text) => {
                const map = {
                    'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ',
                    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎'
                };
                return text.split('').map(char => map[char] || char).join('');
            },
            bold: (text) => {
                const map = {
                    'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
                    'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
                    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
                };
                return text.split('').map(char => map[char] || char).join('');
            },
            cursive: (text) => {
                const map = {
                    'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
                    'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩'
                };
                return text.split('').map(char => map[char] || char).join('');
            },
            combining: (text) => {
                const marks = ['\u0336', '\u0337', '\u0338'];
                return text.split('').map(char => char + marks[Math.floor(Math.random() * marks.length)] + '⃥' + '⃒').join('');
            },
            upsidedown: (text) => {
                const map = {
                    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
                    'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': '⋊', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ὸ', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
                    '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
                    '.': '˙', ',': '\'', '!': '¡', '?': '¿', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', ' ': ' '
                };
                return text.split('').reverse().map(char => map[char] || char).join('');
            },
            reversed: (text) => {
                return text.split('').reverse().join('');
            },
            mirrored: (text) => {
                const map = {
                    'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'i', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
                    'A': 'Ɐ', 'B': 'ᗺ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ὸ', 'R': 'ᴚ', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'Λ', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
                    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                    '.': '.', ',': ',', '!': '!', '?': '?', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', ' ': ' '
                };
                return text.split('').map(char => map[char] || char).join('');
            },
            blockSolid: (text) => {
                const ascii = {
                    'A': '█████\n█   █\n█████\n█   █\n█   █', 'B': '████ \n█   █\n████ \n█   █\n████ ', 'C': '█████\n█    \n█    \n█    \n█████', 'D': '████ \n█   █\n█   █\n█   █\n████ ', 'E': '█████\n█    \n████ \n█    \n█████', 'F': '█████\n█    \n████ \n█    \n█    ', 'G': '█████\n█    \n█  ██\n█   █\n█████', 'H': '█   █\n█   █\n█████\n█   █\n█   █', 'I': '█████\n  █  \n  █  \n  █  \n█████', 'J': '█████\n    █\n    █\n█   █\n█████', 'K': '█   █\n█  █ \n███  \n█  █ \n█   █', 'L': '█    \n█    \n█    \n█    \n█████', 'M': '█   █\n██ ██\n█ █ █\n█   █\n█   █', 'N': '█    █\n██   █\n█ █  █\n█  █ █\n█   ██', 'O': '█████\n█   █\n█   █\n█   █\n█████', 'P': '████ \n█   █\n████ \n█    \n█    ', 'Q': '█████\n█   █\n█   █\n█  █ \n█████', 'R': '████ \n█   █\n████ \n█  █ \n█   █', 'S': '█████\n█    \n█████\n    █\n█████', 'T': '█████\n  █  \n  █  \n  █  \n  █  ', 'U': '█   █\n█   █\n█   █\n█   █\n█████', 'V': '█   █\n█   █\n█   █\n ███ \n  █  ', 'W': '█   █\n█   █\n█ █ █\n██ ██\n█   █', 'X': '█   █\n ███ \n  █  \n ███ \n█   █', 'Y': '█   █\n ███ \n  █  \n  █  \n  █  ', 'Z': '█████\n    █\n  █  \n█    \n█████', ' ': '     '
                };
                const lines = [0, 1, 2, 3, 4];
                return lines.map(lineNum => text.toUpperCase().split('').map(char => (ascii[char] || '     ').split('\n')[lineNum]).join(' ')).join('\n');
            },
            blockHollow: (text) => {
                const ascii = {
                    'A': '  █  \n █ █ \n█   █\n█████\n█   █', 'B': '████ \n█   █\n████ \n█   █\n████ ', 'C': ' ███ \n█    \n█    \n█    \n ███ ', 'D': '████ \n█   █\n█   █\n█   █\n████ ', 'E': '█████\n█    \n███  \n█    \n█████', 'F': '█████\n█    \n███  \n█    \n█    ', 'G': ' ███ \n█    \n█  ██\n█   █\n ███ ', 'H': '█   █\n█   █\n█████\n█   █\n█   █', 'I': ' █ \n █ \n █ \n █ \n███', 'J': '  █  \n  █  \n  █  \n█ █  \n ███ ', 'K': '█   █\n█  █ \n███  \n█  █ \n█   █', 'L': '█    \n█    \n█    \n█    \n█████', 'M': '█   █\n██ ██\n█ █ █\n█   █\n█   █', 'N': '█   █\n██  █\n█ █ █\n█  ██\n█   █', 'O': ' ███ \n█   █\n█   █\n█   █\n ███ ', 'P': '████ \n█   █\n████ \n█    \n█    ', 'Q': ' ███ \n█   █\n█   █\n█  █ \n ███ ', 'R': '████ \n█   █\n████ \n█  █ \n█   █', 'S': ' ███ \n█    \n ███ \n    █\n ███ ', 'T': '█████\n  █  \n  █  \n  █  \n  █  ', 'U': '█   █\n█   █\n█   █\n█   █\n ███ ', 'V': '█   █\n█   █\n █ █ \n █ █ \n  █  ', 'W': '█   █\n█   █\n█ █ █\n██ ██\n█   █', 'X': '█   █\n ███ \n  █  \n ███ \n█   █', 'Y': '█   █\n ███ \n  █  \n  █  \n  █  ', 'Z': '█████\n    █\n  █  \n█    \n█████', ' ': '     '
                };
                const lines = [0, 1, 2, 3, 4];
                return lines.map(lineNum => text.toUpperCase().split('').map(char => (ascii[char] || '     ').split('\n')[lineNum]).join(' ')).join('\n');
            },
            triangle: (text) => {
                const ascii = {
                    'A': '  ▲  \n ▲ ▲ \n▲   ▲\n▲▲▲▲▲\n▲   ▲', 'B': '▲▲▲▲ \n▲   ▲\n▲▲▲▲ \n▲   ▲\n▲▲▲▲ ', 'C': ' ▲▲▲ \n▲    \n▲    \n▲    \n ▲▲▲ ', 'D': '▲▲▲▲ \n▲   ▲\n▲   ▲\n▲   ▲\n▲▲▲▲ ', 'E': '▲▲▲▲▲\n▲    \n▲▲▲  \n▲    \n▲▲▲▲▲', 'F': '▲▲▲▲▲\n▲    \n▲▲▲  \n▲    \n▲    ', 'G': ' ▲▲▲ \n▲    \n▲  ▲▲\n▲   ▲\n ▲▲▲ ', 'H': '▲   ▲\n▲   ▲\n▲▲▲▲▲\n▲   ▲\n▲   ▲', 'I': '▲▲▲▲▲\n  ▲  \n  ▲  \n  ▲  \n▲▲▲▲▲', 'J': '▲▲▲▲▲\n    ▲\n    ▲\n▲   ▲\n ▲▲▲ ', 'K': '▲   ▲\n▲  ▲ \n▲▲▲  \n▲  ▲ \n▲   ▲', 'L': '▲    \n▲    \n▲    \n▲    \n▲▲▲▲▲', 'M': '▲   ▲\n▲▲ ▲▲\n▲ ▲ ▲\n▲   ▲\n▲   ▲', 'N': '▲   ▲\n▲▲  ▲\n▲ ▲ ▲\n▲  ▲▲\n▲   ▲', 'O': ' ▲▲▲ \n▲   ▲\n▲   ▲\n▲   ▲\n ▲▲▲ ', 'P': '▲▲▲▲ \n▲   ▲\n▲▲▲▲ \n▲    \n▲    ', 'Q': ' ▲▲▲ \n▲   ▲\n▲   ▲\n▲  ▲ \n ▲▲▲ ', 'R': '▲▲▲▲ \n▲   ▲\n▲▲▲▲ \n▲  ▲ \n▲   ▲', 'S': ' ▲▲▲ \n▲    \n ▲▲▲ \n    ▲\n ▲▲▲ ', 'T': '▲▲▲▲▲\n  ▲  \n  ▲  \n  ▲  \n  ▲  ', 'U': '▲   ▲\n▲   ▲\n▲   ▲\n▲   ▲\n ▲▲▲ ', 'V': '▲   ▲\n▲   ▲\n▲   ▲\n ▲ ▲ \n  ▲  ', 'W': '▲   ▲\n▲   ▲\n▲ ▲ ▲\n▲▲ ▲▲\n▲   ▲', 'X': '▲   ▲\n ▲▲▲ \n  ▲  \n ▲▲▲ \n▲   ▲', 'Y': '▲   ▲\n ▲▲▲ \n  ▲  \n  ▲  \n  ▲  ', 'Z': '▲▲▲▲▲\n    ▲\n  ▲  \n▲    \n▲▲▲▲▲', ' ': '     '
                };
                const lines = [0, 1, 2, 3, 4];
                return lines.map(lineNum => text.toUpperCase().split('').map(char => (ascii[char] || '     ').split('\n')[lineNum]).join(' ')).join('\n');
            }
        };

        // ===== SYMBOLS DATA =====
        const symbolsData = {
            "Math": ["∑", "√", "∞", "±", "×", "÷", "≈", "≠", "≤", "≥", "∫", "∂", "∆", "∇", "⊕", "⊗", "⊙", "∈", "∉", "∋", "⊆", "⊇", "⊂", "⊃"],
            "Arrows": ["←", "→", "↑", "↓", "↔", "↕", "⟵", "⟶", "⟹", "⇒", "⇐", "⇔", "⟺", "↖", "↗", "↙", "↘", "⤐", "⤑", "➜", "➤", "➥", "➦", "➧", "➨"],
            "Decorative": ["✦", "✧", "★", "☆", "✪", "✫", "✬", "✭", "✮", "✯", "◆", "◇", "○", "●", "◐", "◑", "◒", "◓", "◕", "◖", "◗", "◘", "◙", "◚"],
            "Geometric": ["▶", "◀", "▲", "▼", "◢", "◣", "◤", "◥", "⬢", "⬡", "⬠", "◈", "◉", "◎", "◌", "⬛", "⬜", "⬚", "▀", "▄", "█", "░", "▒", "▓"],
            "Brackets": ["⟨", "⟩", "«", "»", "‹", "›", "⌈", "⌉", "⌊", "⌋", "⌐", "⌞", "⌟", "⌜", "⌝", "⦃", "⦄", "⦅", "⦆", "⦇", "⦈"],
            "Tech": ["⌘", "⌥", "⌫", "⌬", "⌤", "⌨", "⚙", "⚡", "⚠", "⚢", "⚣", "⚤", "⚥", "⚦", "⚧", "⚬", "⌛", "⌚", "☢", "☠", "☮"],
            "Punctuation": ["†", "‡", "•", "‰", "¶", "§", "※", "℃", "™", "©", "®", "℮", "⁂", "⁎", "⁑", "‱", "⁊", "⁋", "‼", "⁇", "⁈", "⁉", "‽"],
            "Currency": ["€", "¢", "£", "¥", "₹", "₽", "₩", "₪", "₦", "₱", "₲", "₴", "₵", "¤", "₠", "₡", "₢", "₣", "₤", "₥", "₧", "₨", "₫"],
            "Extended": ["🢐", "🢑", "🢒", "🢓", "🢔", "🢕", "🢖", "🢗", "🢘", "🢙", "🢚", "🢛", "🢜", "🢝", "🢞", "🢟"],
            "Retro": ["◯", "◉", "◈", "◇", "◆", "▪", "▫", "▬", "▭", "▮", "▯", "♠", "♣", "♥", "♦", "♧", "♨", "♩", "♪", "♫"]
        };

        // ===== DOM ELEMENTS =====
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const outputPreview = document.getElementById('outputPreview');
        const copyOutputBtn = document.getElementById('copyOutputBtn');
        const selectOutputBtn = document.getElementById('selectOutputBtn');
        const clearInputBtn = document.getElementById('clearInputBtn');
        const copyFeedback = document.getElementById('copyFeedback');
        const styleBtns = document.querySelectorAll('.style-btn');
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        // Symbol tab elements
        const symbolOutputText = document.getElementById('symbolOutputText');
        const symbolCopyBtn = document.getElementById('symbolCopyBtn');
        const symbolSelectBtn = document.getElementById('symbolSelectBtn');
        const symbolClearBtn = document.getElementById('symbolClearBtn');
        const symbolsContainer = document.getElementById('symbolsContainer');

        let currentStyle = null;
        let livePreviewEnabled = false;

        const livePreviewCheckbox = document.getElementById('livePreview');
        const defaultStyleSelect = document.getElementById('defaultStyle');

        livePreviewCheckbox.addEventListener('change', () => {
            livePreviewEnabled = livePreviewCheckbox.checked;
            updateStylePreview();
        });

        defaultStyleSelect.addEventListener('change', () => {
            const selectedStyle = defaultStyleSelect.value;
            if (selectedStyle) {
                currentStyle = selectedStyle;
                styleBtns.forEach(b => b.classList.remove('active'));
                const btn = document.querySelector(`.style-btn[data-style="${selectedStyle}"]`);
                if (btn) btn.classList.add('active');
                livePreviewEnabled = true;
                livePreviewCheckbox.checked = true;
                updateStylePreview();
            }
        });

        // ===== TAB SWITCHING =====
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(tabName).classList.add('active');
            });
        });

        // ===== TEXT STYLIZER FUNCTIONALITY =====
        styleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                styleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentStyle = btn.dataset.style;
                updateStylePreview();
            });
        });

        inputText.addEventListener('input', updateStylePreview);

        function updateStylePreview() {
            if (!currentStyle || !inputText.value) {
                outputPreview.textContent = 'Select a style...';
                outputPreview.classList.add('empty');
                outputText.value = '';
                return;
            }

            const styled = textStyles[currentStyle](inputText.value);
            outputText.value = styled;
            
            if (livePreviewEnabled) {
                outputPreview.textContent = styled;
                outputPreview.classList.remove('empty');
            } else {
                outputPreview.textContent = 'Select a style...';
                outputPreview.classList.add('empty');
            }
        }

        // ===== SYMBOL KEYBOARD =====
        function renderSymbols() {
            symbolsContainer.innerHTML = '';
            
            Object.entries(symbolsData).forEach(([category, symbols]) => {
                const section = document.createElement('div');
                section.className = 'section';
                
                const heading = document.createElement('h2');
                heading.innerHTML = `<span class="section-icon">${symbols[0]}</span> ${category}`;
                section.appendChild(heading);

                const grid = document.createElement('div');
                grid.className = 'symbol-grid';

                symbols.forEach(symbol => {
                    const btn = document.createElement('button');
                    btn.className = 'symbol-btn';
                    btn.textContent = symbol;
                    btn.title = `Insert ${symbol}`;
                    
                    btn.addEventListener('click', () => {
                        symbolOutputText.value += symbol;
                        btn.style.background = getComputedStyle(document.documentElement).getPropertyValue('--color-accent');
                        setTimeout(() => {
                            btn.style.background = '';
                        }, 200);
                    });

                    grid.appendChild(btn);
                });

                section.appendChild(grid);
                symbolsContainer.appendChild(section);
            });
        }

        // ===== BUTTON CONTROLS =====
        copyOutputBtn.addEventListener('click', () => {
            if (outputText.value.trim()) {
                navigator.clipboard.writeText(outputText.value).then(() => {
                    showCopyFeedback();
                });
            }
        });

        selectOutputBtn.addEventListener('click', () => {
            outputText.select();
        });

        clearInputBtn.addEventListener('click', () => {
            inputText.value = '';
            outputText.value = '';
            outputPreview.textContent = 'Select a style...';
            outputPreview.classList.add('empty');
        });

        // Symbol keyboard controls
        symbolCopyBtn.addEventListener('click', () => {
            if (symbolOutputText.value.trim()) {
                navigator.clipboard.writeText(symbolOutputText.value).then(() => {
                    showCopyFeedback();
                });
            }
        });

        symbolSelectBtn.addEventListener('click', () => {
            symbolOutputText.select();
        });

        symbolClearBtn.addEventListener('click', () => {
            if (symbolOutputText.value && confirm('Clear all text?')) {
                symbolOutputText.value = '';
            }
        });

        function showCopyFeedback() {
            copyFeedback.classList.add('show');
            setTimeout(() => copyFeedback.classList.remove('show'), 2000);
        }

        // Initial render
        renderSymbols();

        // Set initial window position (top-left, slightly offset)
        const mainWindow = document.getElementById('mainWindow');
        mainWindow.style.left = '20px';
        mainWindow.style.top = '20px';
        mainWindow.style.width = '500px';
        mainWindow.style.maxHeight = '80vh';

        // ===== LOGO CREATOR FUNCTIONALITY =====
        const logoText = document.getElementById('logoText');
        const logoPreview = document.getElementById('logoPreview');
        const logoSize = document.getElementById('logoSize');
        const sizeValue = document.getElementById('sizeValue');
        const logoBg = document.getElementById('logoBg');
        const customColor = document.getElementById('customColor');
        const colorValue = document.getElementById('colorValue');
        const customColorGroup = document.getElementById('customColorGroup');
        const downloadSvgBtn = document.getElementById('downloadSvg');
        const copySvgBtn = document.getElementById('copySvgCode');

        let currentColorMode = 'random';
        let currentDesign = 'riley';
        let currentDecorations = new Set();
        let currentAnimation = 'none';
        let currentAlignment = 'center';

        // Color Mode Selection
        document.querySelectorAll('[data-color-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-color-mode]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentColorMode = btn.dataset.colorMode;
                if (btn.dataset.colorMode === 'custom') {
                    customColorGroup.style.display = 'block';
                } else {
                    customColorGroup.style.display = 'none';
                }
                updateLogo();
            });
        });

        // Design Style Selection
        document.querySelectorAll('[data-design]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-design]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentDesign = btn.dataset.design;
                updateLogo();
            });
        });

        // Size Control
        logoSize.addEventListener('input', () => {
            sizeValue.textContent = logoSize.value;
            updateLogo();
        });

        // Logo Text Input
        logoText.addEventListener('input', updateLogo);
        logoBg.addEventListener('change', updateLogo);

        // Decoration Selection (Multiple Toggle)
        document.querySelectorAll('[data-decoration]').forEach(btn => {
            btn.addEventListener('click', () => {
                const decoration = btn.dataset.decoration;
                const isToggle = btn.dataset.decorationToggle === 'true';
                
                if (!isToggle) {
                    // "None" button clears all
                    document.querySelectorAll('[data-decoration]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentDecorations.clear();
                } else {
                    // Toggle decoration buttons
                    btn.classList.toggle('active');
                    if (currentDecorations.has(decoration)) {
                        currentDecorations.delete(decoration);
                    } else {
                        currentDecorations.add(decoration);
                        // Remove None button active state
                        document.querySelector('[data-decoration="none"]').classList.remove('active');
                    }
                    
                    // If no decorations selected, activate None
                    if (currentDecorations.size === 0) {
                        document.querySelector('[data-decoration="none"]').classList.add('active');
                    }
                }
                updateLogo();
            });
        });

        // Animation Selection
        document.querySelectorAll('[data-animation]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-animation]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentAnimation = btn.dataset.animation;
                updateLogo();
            });
        });

        // Alignment Selection
        document.querySelectorAll('[data-alignment]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-alignment]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentAlignment = btn.dataset.alignment;
                updateLogoAlignment();
            });
        });

        // Custom Color
        customColor.addEventListener('input', () => {
            colorValue.textContent = customColor.value;
            updateLogo();
        });

        function getColorForChar(index, total, char) {
            if (currentColorMode === 'random') {
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
                return colors[Math.floor(Math.random() * colors.length)];
            } else if (currentColorMode === 'rgb') {
                const hue = (index / total) * 360;
                return `hsl(${hue}, 100%, 50%)`;
            } else if (currentColorMode === 'mono') {
                return '#2180a8';
            } else if (currentColorMode === 'custom') {
                return customColor.value;
            }
        }

        function generateDecorationSVG(totalWidth, totalHeight) {
            let decorationElements = '';
            
            if (currentDecorations.has('underline')) {
                const padding = 20;
                const y = totalHeight - padding / 2;
                decorationElements += `<line x1="${padding}" y1="${y}" x2="${totalWidth - padding}" y2="${y}" stroke="#2180a8" stroke-width="3" opacity="0.6"/>`;
            }
            
            if (currentDecorations.has('overline')) {
                const padding = 20;
                const y = padding;
                decorationElements += `<line x1="${padding}" y1="${y}" x2="${totalWidth - padding}" y2="${y}" stroke="#2180a8" stroke-width="3" opacity="0.6"/>`;
            }
            
            if (currentDecorations.has('frame')) {
                const padding = 15;
                decorationElements += `<rect x="${padding}" y="${padding}" width="${totalWidth - padding * 2}" height="${totalHeight - padding * 2}" fill="none" stroke="#2180a8" stroke-width="2" opacity="0.6" rx="4"/>`;
            }
            
            if (currentDecorations.has('shadow')) {
                const defId = 'shadow-filter-' + Math.random().toString(36).substr(2, 9);
                decorationElements = `<defs><filter id="${defId}"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.5"/></filter></defs>` + decorationElements;
            }
            
            if (currentDecorations.has('glow')) {
                const defId = 'glow-filter-' + Math.random().toString(36).substr(2, 9);
                decorationElements = `<defs><filter id="${defId}"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="${defId}"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>` + decorationElements;
            }
            
            return decorationElements;
        }

        function generateLogoSVG(text, blockSize = 10) {
            const size = parseInt(blockSize);
            const padding = size * 2;
            const defs = [];
            const ascii = {
                'A': '█████\n█   █\n█████\n█   █\n█   █', 'B': '████ \n█   █\n████ \n█   █\n████ ', 'C': '█████\n█    \n█    \n█    \n█████', 'D': '████ \n█   █\n█   █\n█   █\n████ ', 'E': '█████\n█    \n████ \n█    \n█████', 'F': '█████\n█    \n████ \n█    \n█    ', 'G': '█████\n█    \n█  ██\n█   █\n█████', 'H': '█   █\n█   █\n█████\n█   █\n█   █', 'I': '█████\n  █  \n  █  \n  █  \n█████', 'J': '█████\n    █\n    █\n█   █\n█████', 'K': '█   █\n█  █ \n███  \n█  █ \n█   █', 'L': '█    \n█    \n█    \n█    \n█████', 'M': '█   █\n██ ██\n█ █ █\n█   █\n█   █', 'N': '█    █\n██   █\n█ █  █\n█  █ █\n█   ██', 'O': '█████\n█   █\n█   █\n█   █\n█████', 'P': '████ \n█   █\n████ \n█    \n█    ', 'Q': '█████\n█   █\n█   █\n█  █ \n█████', 'R': '████ \n█   █\n████ \n█  █ \n█   █', 'S': '█████\n█    \n█████\n    █\n█████', 'T': '█████\n  █  \n  █  \n  █  \n  █  ', 'U': '█   █\n█   █\n█   █\n█   █\n█████', 'V': '█   █\n█   █\n█   █\n ███ \n  █  ', 'W': '█   █\n█   █\n█ █ █\n██ ██\n█   █', 'X': '█   █\n ███ \n  █  \n ███ \n█   █', 'Y': '█   █\n ███ \n  █  \n  █  \n  █  ', 'Z': '█████\n    █\n  █  \n█    \n█████', ' ': '     '
            };

            let rects = [];
            let x = padding, y = padding;
            let totalChars = text.length;

            text.toUpperCase().split('').forEach((char, charIdx) => {
                const charPattern = ascii[char] || '     ';
                const lines = charPattern.split('\n');
                
                lines.forEach((line, lineIdx) => {
                    line.split('').forEach((pixel, pixelIdx) => {
                        if (pixel === '█') {
                            const color = getColorForChar(charIdx * 5 + lineIdx, totalChars * 5, char);
                            const gx = x + pixelIdx * size;
                            const gy = y + lineIdx * size;

                            if (currentDesign === 'riley') {
                                // Bridget Riley Op-Art: wavy/distorted blocks
                                const wave = Math.sin(gy / (size * 3)) * size * 0.3;
                                rects.push(`<rect x="${gx + wave}" y="${gy}" width="${size}" height="${size}" fill="${color}" stroke="#000" stroke-width="0.5" opacity="0.9"/>`);
                            } else if (currentDesign === 'stijl') {
                                // De Stijl: primary colors + black grid
                                const colors3 = ['#FF0000', '#0000FF', '#FFFF00'];
                                const stijlColor = colors3[Math.floor(Math.random() * 3)];
                                rects.push(`<rect x="${gx}" y="${gy}" width="${size}" height="${size}" fill="${stijlColor}" stroke="#000" stroke-width="2"/>`);
                            } else if (currentDesign === 'bauhaus') {
                                // Bauhaus: clean, geometric, structured
                                rects.push(`<rect x="${gx}" y="${gy}" width="${size}" height="${size}" fill="${color}" stroke="#333" stroke-width="1"/>`);
                            } else if (currentDesign === 'constructivist') {
                                // Constructivist: dynamic angles, bold
                                rects.push(`<rect x="${gx}" y="${gy}" width="${size}" height="${size}" fill="${color}" stroke="#000" stroke-width="1.5" transform="rotate(5 ${gx + size/2} ${gy + size/2})"/>`);
                            } else if (currentDesign === 'minimalist') {
                                // Minimalist: clean, single color, no stroke
                                rects.push(`<rect x="${gx}" y="${gy}" width="${size}" height="${size}" fill="${color}"/>`);
                            }
                        }
                    });
                });

                x += 6 * size + size;
                if (x > 400) {
                    x = padding;
                    y += 6 * size;
                }
            });

            const totalWidth = x + padding;
            const totalHeight = y + 6 * size + padding;

            let bgColor = 'transparent';
            if (logoBg.value === 'white') bgColor = '#ffffff';
            if (logoBg.value === 'light') bgColor = '#f5f5f5';

            const decorations = generateDecorationSVG(totalWidth, totalHeight);
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
                <rect width="${totalWidth}" height="${totalHeight}" fill="${bgColor}"/>
                ${decorations}
                ${rects.join('\n')}
            </svg>`;

            return svg;
        }

        function updateLogoAlignment() {
            logoPreview.classList.remove('align-left', 'align-right', 'align-center', 'align-justify');
            logoPreview.classList.add(`align-${currentAlignment}`);
        }

        function updateLogo() {
            if (!logoText.value.trim()) {
                logoPreview.innerHTML = '<p style="color: var(--color-text-secondary); font-style: italic;">Enter text to generate logo</p>';
                return;
            }

            const svg = generateLogoSVG(logoText.value, logoSize.value);
            logoPreview.innerHTML = svg;
            
            const svgElement = logoPreview.querySelector('svg');
            if (svgElement) {
                svgElement.classList.remove('animate-pulse', 'animate-flicker', 'animate-wave', 'animate-float');
                if (currentAnimation !== 'none') {
                    svgElement.classList.add(`animate-${currentAnimation}`);
                }
            }

            updateLogoAlignment();
        }

        downloadSvgBtn.addEventListener('click', () => {
            if (!logoText.value.trim()) return;
            const svg = generateLogoSVG(logoText.value, logoSize.value);
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${logoText.value.toLowerCase()}-logo.svg`;
            a.click();
            URL.revokeObjectURL(url);
            showCopyFeedback();
        });

        copySvgBtn.addEventListener('click', () => {
            if (!logoText.value.trim()) return;
            const svg = generateLogoSVG(logoText.value, logoSize.value);
            navigator.clipboard.writeText(svg).then(() => {
                showCopyFeedback();
            });
        });

        // Refresh tab listeners after window modifications
        setTimeout(() => {
            const tabBtnsRefresh = document.querySelectorAll('.tab-btn');
            tabBtnsRefresh.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabName = btn.dataset.tab;
                    const tabBtnsAll = btn.closest('.tabs').querySelectorAll('.tab-btn');
                    const container = btn.closest('.float-content') || document.body;
                    const tabContentsAll = container.querySelectorAll('.tab-content');
                    tabBtnsAll.forEach(b => b.classList.remove('active'));
                    tabContentsAll.forEach(c => c.classList.remove('active'));
                    btn.classList.add('active');
                    container.querySelector(`#${tabName}`).classList.add('active');
                });
            });
        }, 100);
    </script>

    <!-- Service Worker for Offline Support -->
    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('data:application/javascript;base64,Ly8gU2ltcGxlIFNlcnZpY2UgV29ya2VyIGZvciBvZmZsaW5lIHN1cHBvcnQ=').catch(() => {});
        }
