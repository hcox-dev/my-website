"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// Types for keybinding actions
type KeyActionType = 
    | "scroll"
    | "custom";

type KeyBinding = {
    key: string;
    actionType: KeyActionType;
    actionParams?: any;
    description: string;
    category?: string;
};

// Configuration interface
interface VimKeybindingsConfig {
    enableKey?: string;
    disableKey?: string;
    helpKey?: string;
    customBindings?: KeyBinding[];
    scrollAmount?: number;
    debug?: boolean;
}

// Default configuration
const defaultConfig: Required<VimKeybindingsConfig> = {
    enableKey: "-",
    disableKey: "Escape",
    helpKey: "?",
    customBindings: [],
    scrollAmount: 100,
    debug: false,
};

// Help Modal Component
const HelpModal = ({ 
    isOpen, 
    onClose, 
    helpContent, 
    config 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    helpContent: { [category: string]: KeyBinding[] };
    config: Required<VimKeybindingsConfig>;
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(4px)",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
            onClick={onClose}
        >
            <div 
                style={{
                    backgroundColor: "var(--bg-alt, #23272e)",
                    borderRadius: "12px",
                    padding: "2rem",
                    maxWidth: "700px",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    border: "2px solid var(--primary, #7fd1b9)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                    color: "var(--text, #f4f4f4)",
                    fontFamily: "'Fira Mono', monospace",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid var(--border, #2d3138)",
                    paddingBottom: "1rem"
                }}>
                    <h2 style={{ 
                        margin: 0, 
                        color: "var(--primary, #7fd1b9)",
                        fontSize: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                    }}>
                        <span>⌨️</span>
                        Vim Keybindings Help
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "2px solid var(--border, #2d3138)",
                            color: "var(--text-muted, #b0b8c1)",
                            borderRadius: "6px",
                            padding: "0.5rem",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                            lineHeight: 1,
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--primary, #7fd1b9)";
                            e.currentTarget.style.color = "var(--primary, #7fd1b9)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border, #2d3138)";
                            e.currentTarget.style.color = "var(--text-muted, #b0b8c1)";
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ display: "grid", gap: "1.5rem" }}>
                    {Object.entries(helpContent).map(([category, bindings]) => (
                        <div key={category}>
                            <h3 style={{ 
                                margin: "0 0 0.8rem 0",
                                color: "var(--primary, #7fd1b9)",
                                fontSize: "1.1rem",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                borderLeft: "3px solid var(--primary, #7fd1b9)",
                                paddingLeft: "0.8rem"
                            }}>
                                {category}
                            </h3>
                            <div style={{ 
                                display: "grid", 
                                gap: "0.4rem",
                                marginLeft: "1.1rem"
                            }}>
                                {bindings.map((binding) => (
                                    <div 
                                        key={binding.key}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                            padding: "0.4rem 0.8rem",
                                            borderRadius: "6px",
                                            backgroundColor: "var(--bg, #181c20)",
                                            border: "1px solid var(--border, #2d3138)",
                                        }}
                                    >
                                        <kbd style={{
                                            backgroundColor: "var(--primary, #7fd1b9)",
                                            color: "var(--bg, #181c20)",
                                            padding: "0.2rem 0.6rem",
                                            borderRadius: "4px",
                                            fontSize: "0.9rem",
                                            fontWeight: "bold",
                                            minWidth: "24px",
                                            textAlign: "center",
                                            border: "2px solid var(--primary-dark, #5bb89a)",
                                        }}>
                                            {binding.key}
                                        </kbd>
                                        <span style={{ 
                                            color: "var(--text-muted, #b0b8c1)",
                                            fontSize: "0.95rem"
                                        }}>
                                            {binding.description}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                    {/* Control section */}
                    <div>
                        <h3 style={{ 
                            margin: "0 0 0.8rem 0",
                            color: "var(--primary, #7fd1b9)",
                            fontSize: "1.1rem",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            borderLeft: "3px solid var(--primary, #7fd1b9)",
                            paddingLeft: "0.8rem"
                        }}>
                            CONTROL
                        </h3>
                        <div style={{ 
                            display: "grid", 
                            gap: "0.4rem",
                            marginLeft: "1.1rem"
                        }}>
                            {[
                                { key: config.enableKey, desc: "Enable vim mode" },
                                { key: config.disableKey, desc: "Disable vim mode" },
                                { key: config.helpKey, desc: "Show this help" },
                                ...(config.debug ? [{ key: "`", desc: "Debug scroll capability" }] : [])
                            ].map(({ key, desc }) => (
                                <div 
                                    key={key}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        padding: "0.4rem 0.8rem",
                                        borderRadius: "6px",
                                        backgroundColor: "var(--bg, #181c20)",
                                        border: "1px solid var(--border, #2d3138)",
                                    }}
                                >
                                    <kbd style={{
                                        backgroundColor: "var(--primary, #7fd1b9)",
                                        color: "var(--bg, #181c20)",
                                        padding: "0.2rem 0.6rem",
                                        borderRadius: "4px",
                                        fontSize: "0.9rem",
                                        fontWeight: "bold",
                                        minWidth: "24px",
                                        textAlign: "center",
                                        border: "2px solid var(--primary-dark, #5bb89a)",
                                    }}>
                                        {key}
                                    </kbd>
                                    <span style={{ 
                                        color: "var(--text-muted, #b0b8c1)",
                                        fontSize: "0.95rem"
                                    }}>
                                        {desc}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: "2rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border, #2d3138)",
                    textAlign: "center",
                    color: "var(--text-muted, #b0b8c1)",
                    fontSize: "0.85rem"
                }}>
                    Press <kbd style={{
                        backgroundColor: "var(--bg, #181c20)",
                        padding: "0.2rem 0.4rem",
                        borderRadius: "3px",
                        border: "1px solid var(--border, #2d3138)"
                    }}>Escape</kbd> or click outside to close
                </div>
            </div>
        </div>
    );
};

export default function VimKeybindings({ config: userConfig = {} }: { config?: VimKeybindingsConfig }) {
    const config = { ...defaultConfig, ...userConfig };
    const enabled = useRef(false);
    const keyBindings = useRef<Record<string, KeyBinding>>({});
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [helpContent, setHelpContent] = useState<{ [category: string]: KeyBinding[] }>({});

    // Debug logging utility
    const debugLog = useCallback((message: string, data?: any) => {
        if (config.debug) {
            console.log(`[VimKeybindings] ${message}`, data || '');
        }
    }, [config.debug]);

    // Debug scroll capability
    const debugScrollCapability = useCallback(() => {
        if (!config.debug) return;
        
        const body = document.body;
        const html = document.documentElement;
        const bodyStyles = window.getComputedStyle(body);
        const htmlStyles = window.getComputedStyle(html);
        
        debugLog("=== SCROLL DEBUG INFO ===");
        debugLog(`Window dimensions: ${window.innerWidth}x${window.innerHeight}`);
        debugLog(`Document dimensions: ${document.documentElement.scrollWidth}x${document.documentElement.scrollHeight}`);
        debugLog(`Body dimensions: ${body.scrollWidth}x${body.scrollHeight}`);
        debugLog(`Current scroll position: ${window.scrollX}, ${window.scrollY}`);
        debugLog(`Max scroll: ${document.documentElement.scrollWidth - window.innerWidth}, ${document.documentElement.scrollHeight - window.innerHeight}`);
        debugLog("Body styles:", {
            overflow: bodyStyles.overflow,
            overflowX: bodyStyles.overflowX,
            overflowY: bodyStyles.overflowY,
            height: bodyStyles.height,
            minHeight: bodyStyles.minHeight,
            maxHeight: bodyStyles.maxHeight,
            position: bodyStyles.position
        });
        debugLog("HTML styles:", {
            overflow: htmlStyles.overflow,
            overflowX: htmlStyles.overflowX,
            overflowY: htmlStyles.overflowY,
            height: htmlStyles.height,
            minHeight: htmlStyles.minHeight,
            maxHeight: htmlStyles.maxHeight,
            position: htmlStyles.position
        });
        debugLog("=== END SCROLL DEBUG ===");
    }, [config.debug, debugLog]);

    // Show help modal
    const showHelp = useCallback((bindings: KeyBinding[]) => {
        debugLog("Showing help modal");
        const categorizedBindings = bindings.reduce((acc, binding) => {
            const category = binding.category || "other";
            if (!acc[category]) acc[category] = [];
            acc[category].push(binding);
            return acc;
        }, {} as Record<string, KeyBinding[]>);

        setHelpContent(categorizedBindings);
        setShowHelpModal(true);
    }, [debugLog]);

    // Close help modal
    const closeHelp = useCallback(() => {
        setShowHelpModal(false);
        setHelpContent({});
    }, []);

    // Utility functions
    const showIndicator = useCallback((text: string, isEnabled = true) => {
        debugLog(`Showing indicator: "${text}" (enabled: ${isEnabled})`);
        const indicator = document.createElement("div");
        indicator.textContent = text;
        indicator.style.cssText = `
            position: fixed; 
            top: 20px; 
            right: 20px; 
            background: ${isEnabled ? "var(--primary, #007acc)" : "#666"}; 
            color: white; 
            padding: 8px 12px; 
            border-radius: 4px; 
            font-size: 12px; 
            z-index: 10000;
            font-family: monospace;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(indicator);
        setTimeout(() => indicator.remove(), isEnabled ? 2000 : 1500);
    }, [debugLog]);

    const scrollTo = useCallback((amount: number, behavior: ScrollBehavior = "smooth") => {
        debugLog(`Scrolling by ${amount}px with behavior: ${behavior}`);
        
        // Debug current scroll position
        const beforeScroll = window.scrollY;
        debugLog(`Current scroll position: ${beforeScroll}px`);
        debugLog(`Document height: ${document.documentElement.scrollHeight}px, viewport height: ${window.innerHeight}px`);
        
        // Try multiple scroll methods for better compatibility
        try {
            // Method 1: window.scrollBy (modern)
            window.scrollBy({ top: amount, behavior });
            
            // Method 2: Fallback for older browsers or specific CSS issues
            setTimeout(() => {
                const afterScroll = window.scrollY;
                debugLog(`Scroll position after scrollBy: ${afterScroll}px (change: ${afterScroll - beforeScroll}px)`);
                
                // If scrollBy didn't work, try alternative methods
                if (Math.abs(afterScroll - beforeScroll) < Math.abs(amount) * 0.1) {
                    debugLog("scrollBy didn't work, trying alternative methods");
                    
                    // Try scrollTo with current position + amount
                    const targetScroll = Math.max(0, Math.min(
                        document.documentElement.scrollHeight - window.innerHeight,
                        beforeScroll + amount
                    ));
                    debugLog(`Trying scrollTo with target: ${targetScroll}px`);
                    window.scrollTo({ top: targetScroll, behavior });
                    
                    // Check if that worked
                    setTimeout(() => {
                        const finalScroll = window.scrollY;
                        debugLog(`Final scroll position: ${finalScroll}px`);
                        
                        if (Math.abs(finalScroll - beforeScroll) < Math.abs(amount) * 0.1) {
                            debugLog("All scroll methods failed - checking for CSS scroll issues");
                            
                            // Check for common CSS issues that prevent scrolling
                            const body = document.body;
                            const html = document.documentElement;
                            const bodyStyles = window.getComputedStyle(body);
                            const htmlStyles = window.getComputedStyle(html);
                            
                            debugLog("Body overflow:", bodyStyles.overflow);
                            debugLog("HTML overflow:", htmlStyles.overflow);
                            debugLog("Body height:", bodyStyles.height);
                            debugLog("HTML height:", htmlStyles.height);
                        }
                    }, 100);
                }
            }, 100);
            
        } catch (error) {
            debugLog("Error during scrolling:", error);
        }
    }, [debugLog]);




    // Execute action based on actionType
    const executeAction = useCallback((binding: KeyBinding) => {
        debugLog(`Executing action: ${binding.actionType} (${binding.key})`, binding.actionParams);
        
        switch (binding.actionType) {
            case "scroll":
                scrollTo(binding.actionParams || 0);
                break;
            case "custom":
                debugLog("Executing custom action");
                if (typeof binding.actionParams === "function") {
                    binding.actionParams();
                }
                break;
            default:
                debugLog(`Unknown action type: ${binding.actionType}`);
        }
    }, [scrollTo, debugLog]);

    // Initialize keybindings
    const initializeKeybindings = useCallback(() => {
        debugLog("Initializing keybindings...");
        
        const bindings: KeyBinding[] = [
            // Basic up/down movements only
            { key: "j", actionType: "scroll", actionParams: config.scrollAmount, description: "Scroll down", category: "scroll" },
            { key: "k", actionType: "scroll", actionParams: -config.scrollAmount, description: "Scroll up", category: "scroll" },
        ];

        debugLog(`Created ${bindings.length} basic movement bindings`);

        // Add custom bindings
        bindings.push(...config.customBindings);
        debugLog(`Added ${config.customBindings.length} custom bindings`);

        // Convert to binding map
        const bindingMap: Record<string, KeyBinding> = {};
        bindings.forEach(binding => {
            bindingMap[binding.key] = binding;
        });

        // Add help binding
        bindingMap[config.helpKey] = {
            key: config.helpKey,
            actionType: "custom",
            actionParams: () => showHelp(bindings),
            description: "Show help",
            category: "control"
        };

        // Add debug keybinding for scroll capability testing
        if (config.debug) {
            bindingMap['`'] = {
                key: '`',
                actionType: "custom",
                actionParams: debugScrollCapability,
                description: "Debug scroll capability",
                category: "debug"
            };
        }

        keyBindings.current = bindingMap;
        debugLog(`Total keybindings registered: ${Object.keys(bindingMap).length}`);
        
        if (config.debug) {
            debugLog("Keybinding map:", Object.keys(bindingMap).sort());
            // Run initial scroll debug
            setTimeout(debugScrollCapability, 100);
        }
    }, [config, executeAction, debugLog, showHelp, debugScrollCapability]);

    // Event handler
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Don't capture keys when user is typing in inputs or help modal is open
        if (showHelpModal ||
            e.target instanceof HTMLInputElement || 
            e.target instanceof HTMLTextAreaElement || 
            e.target instanceof HTMLSelectElement ||
            (e.target as HTMLElement).contentEditable === "true") {
            debugLog(`Key ignored - ${showHelpModal ? 'help modal open' : 'user typing in input element'}: ${e.key}`);
            return;
        }

        if (!enabled.current) {
            if (e.key === config.enableKey) {
                debugLog("Vim mode enabled");
                enabled.current = true;
                showIndicator("VIM MODE ENABLED (Press ? for help)", true);
                e.preventDefault();
                return;
            }
            return;
        }

        debugLog(`Key pressed in vim mode: '${e.key}'`);

        if (keyBindings.current[e.key]) {
            debugLog(`Found binding for key: '${e.key}'`);
            e.preventDefault();
            executeAction(keyBindings.current[e.key]);
        } else {
            debugLog(`No binding found for key: '${e.key}'`);
        }
        
        // Disable vim mode
        if (e.key === config.disableKey) {
            debugLog("Vim mode disabled");
            enabled.current = false;
            showIndicator("VIM MODE DISABLED", false);
            e.preventDefault();
        }
    }, [config.enableKey, config.disableKey, showIndicator, executeAction, debugLog, showHelpModal]);

    useEffect(() => {
        // Initialize keybindings on mount and when config changes
        debugLog("useEffect triggered - initializing keybindings", { 
            debug: config.debug,
            customBindings: config.customBindings.length 
        });
        initializeKeybindings();
    }, [initializeKeybindings, debugLog]);

    useEffect(() => {
        debugLog("Adding keydown event listener");
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            debugLog("Removing keydown event listener");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown, debugLog]);

    return (
        <>
            <HelpModal 
                isOpen={showHelpModal}
                onClose={closeHelp}
                helpContent={helpContent}
                config={config}
            />
        </>
    );
}

// Export types and utilities for reuse
export type { KeyBinding, VimKeybindingsConfig };
