import React from 'react';
import { createRoot } from 'react-dom/client';
import EmojiPicker from 'emoji-picker-react';
import {BsEmojiSmile} from "react-icons/bs";

let emojiContainer = null;
let emojiRoot = null;
let isPickerVisible = false;

export const emoji = {
    name: 'emoji',
    keyCommand: 'emoji',
    buttonProps: { 'aria-label': 'Insert emoji', title: 'Insert emoji' },
    icon: <BsEmojiSmile/>,
    execute: (state, api) => {
        if (emojiContainer && isPickerVisible) {
            emojiContainer.style.display = 'none';
            isPickerVisible = false;
            document.removeEventListener('click', outsideClickListener);
            return;
        }

        if (!emojiContainer) {
            emojiContainer = document.createElement('div');
            emojiContainer.className = 'emoji-picker-container';
            emojiContainer.style.position = 'absolute';
            emojiContainer.style.zIndex = '9999';
            emojiContainer.style.background = '#fff';
            emojiContainer.style.border = '1px solid #ccc';
            emojiContainer.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
            emojiContainer.style.padding = '4px';
            emojiContainer.style.borderRadius = '6px';
            document.body.appendChild(emojiContainer);

            emojiRoot = createRoot(emojiContainer);
            emojiRoot.render(
                <EmojiPicker
                    onEmojiClick={(emojiData) => {
                        state.command.insertEmoji(emojiData.emoji);
                        emojiContainer.style.display = 'none';
                        isPickerVisible = false;
                        document.removeEventListener('click', outsideClickListener);
                    }}
                    previewConfig={{ showPreview: false }}
                    autoFocusSearch={false}
                    // searchDisabled={true}
                    height={400}
                    width={300}
                />
            );
        }
// Position near the button again
        const buttonEl = document.querySelector('[data-name="emoji"]');
        if (buttonEl) {
            const rect = buttonEl.getBoundingClientRect();
            emojiContainer.style.top = `${rect.bottom + window.scrollY + 4}px`;
            emojiContainer.style.left = `${rect.left + window.scrollX}px`;
            emojiContainer.style.display = 'block';
            isPickerVisible = true;

            setTimeout(() => {
                document.addEventListener('click', outsideClickListener);
            }, 0);
        }

        function outsideClickListener(e) {
            if (
                !emojiContainer.contains(e.target) &&
                !buttonEl.contains(e.target)
            ) {
                emojiContainer.style.display = 'none';
                isPickerVisible = false;
                document.removeEventListener('click', outsideClickListener);
            }
        }

        setTimeout(() => {
            document.addEventListener('click', outsideClickListener);
        }, 0);
    },
};
