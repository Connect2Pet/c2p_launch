export const getTargetDate = () => {
  const now = new Date();
  const year =
    now.getMonth() > 4 && now.getDate() > 25
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(year, 4, 26); // Month is 0-indexed, 4 = May
};

export const sendFormData = async (formData) => {
  console.log("Data being sent", formData);
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbz-AfbPqHqc6-dR2YGd6zdzlLBwSVYEdRihDMpM647T58LesT87N8GWhC35arbnEW2mgQ/exec",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error sending form data:", error);
    throw error;
  }
};
