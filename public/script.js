document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const templateSelect = document.getElementById("templateId");
  const userInput = document.getElementById("userInput");
  const outputCard = document.getElementById("outputCard");
  const outputContent = document.getElementById("outputContent");
  const copyBtn = document.getElementById("copyBtn");

  generateBtn.addEventListener("click", async () => {
    const templateId = templateSelect.value;
    const text = userInput.value.trim();

    if (!text) {
      alert("Please enter some text before generating.");
      return;
    }

    // UI Loading State
    generateBtn.disabled = true;
    generateBtn.querySelector(".btn-text").textContent = "Processing...";
    outputCard.classList.remove("hidden");
    outputContent.classList.remove("error");
    outputContent.textContent = "AI is generating your output...";

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, userInput: text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation request failed.");
      }

      outputContent.textContent = data.result;
    } catch (err) {
      outputContent.classList.add("error");
      outputContent.textContent = `Error: ${err.message}`;
    } finally {
      generateBtn.disabled = false;
      generateBtn.querySelector(".btn-text").textContent = "Generate Output";
    }
  });

  // Copy to clipboard feature
  copyBtn.addEventListener("click", () => {
    const textToCopy = outputContent.textContent;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 2000);
    });
  });
});
