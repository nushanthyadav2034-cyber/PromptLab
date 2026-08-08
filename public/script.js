document.getElementById("generateBtn").addEventListener("click", async () => {
  const templateId = document.getElementById("templateId").value;
  const userInput = document.getElementById("userInput").value.trim();
  const generateBtn = document.getElementById("generateBtn");
  const outputContainer = document.getElementById("outputContainer");

  if (!userInput) {
    alert("Please enter some text before generating.");
    return;
  }

  // Set Loading State
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  outputContainer.style.display = "block";
  outputContainer.classList.remove("error");
  outputContainer.textContent = "Processing request with AI model...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ templateId, userInput })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An unexpected error occurred.");
    }

    outputContainer.textContent = data.result;
  } catch (err) {
    outputContainer.classList.add("error");
    outputContainer.textContent = `Error: ${err.message}`;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate";
  }
});
