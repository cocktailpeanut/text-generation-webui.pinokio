# text-generation-webui.pinokio

A one-click installer for [oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui)

# How to use

1. Install with the [install.json](install.json?raw) script
2. The installation will open in a **default mode**. If you want to try other modes like chat mode and notebook mode, **click stop** to stop the server and come back to the project page, and you will see buttons like **start chat mode**, **start basic mode**, **start notebook mode**, and **start with custom flags**.
2. Run either the [basic.json](basic.json), [chat.json](chat.json), [notebook.json](notebook.json), or [custom.json](custom.json). This will launch the web ui.
3. Make sure to add a model in the "Model" tab (Explained below)

# Running Llama 2

## Step 1. Download models

![download_model.png](download_model.png?raw=true)

Go to the **Model** tab and find the input field asking for a huggingface name. The raw model from Meta is not immediately usable in Text-generation-ui (and requires permission), so enter the following converted models (for transformer):

- `NousResearch/Llama-2-7b-hf`: Llama2 7B HF
- `NousResearch/Llama-2-7b-chat-hf`: Llama2 7B Chat HF
- `NousResearch/Llama-2-13b-hf`: Llama2 13B HF
- `NousResearch/Llama-2-13b-chat-hf`: Llam2 13B Chat HF
- `NousResearch/Llama-2-70b-hf: Llama2 70B HF
- `NousResearch/Llama-2-70b-chat-hf`: Llama2 70B Chat HF

## Step 2. Load models

![load_model.png](load_model.png?raw=true)

Downloading alone doesn't automatically load the model.

After downloading, press the refresh button from the model loader section, and select the newly downloaded model.

Then press load.

That's all! You're now ready to play with your model!

# Modes

## 1. Basic mode

The default mode. Separate columns for input and output.

![chat_mode.png](chat_mode.png?raw=true)

## 2. Notebook mode

One column used for both input and output

![notebook_mode.png](notebook_mode.png?raw=true)


## 3. Chat mode

Chat UI.

![chat_mode.png](chat_mode.png?raw=true)

## 4. Custom mode

If you are an advanced user and want to directly tweak the command line flags as explained here: https://github.com/oobabooga/text-generation-webui#starting-the-web-ui you can use this mode
