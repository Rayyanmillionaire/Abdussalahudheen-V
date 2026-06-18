import "./Contact.css";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    place: "",
    occupation: "",
    income: "",
    maritalStatus: "",
    service: "",
    familyMembers: "",
    familyAges: "",
    investmentAmount: "",
    riskAppetite: "",
    currentSavings: "",
    retirementAge: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let message = `
Hello SecureLife Advisors

Name: ${formData.name}
Age: ${formData.age}
Gender: ${formData.gender}
Phone: ${formData.phone}
Place: ${formData.place}
Occupation: ${formData.occupation}
Monthly Income: ₹${formData.income}
Marital Status: ${formData.maritalStatus}

Service Required: ${formData.service}
`;

    if (
      formData.service === "Term Insurance" ||
      formData.service === "Health Insurance"
    ) {
      message += `
Family Members: ${formData.familyMembers}
Family Ages: ${formData.familyAges}
`;
    }

    if (formData.service === "Mutual Funds") {
      message += `
Investment Amount: ₹${formData.investmentAmount}
Risk Appetite: ${formData.riskAppetite}
`;
    }

    if (formData.service === "Retirement Planning") {
      message += `
Current Savings: ₹${formData.currentSavings}
Target Retirement Age: ${formData.retirementAge}
`;
    }

    message += `

Additional Notes:
${formData.notes}
`;

    const whatsappUrl = `https://wa.me/919645622444?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">

        <div className="contact-info">
          <span>Financial Assessment Form</span>

          <h2>
            Let's Build Your Financial Future
          </h2>

          <p>
            Fill out the assessment form and get personalized
            financial guidance from SecureLife Advisors.
          </p>

          <div className="contact-points">
            <p>✓ Free Consultation</p>
            <p>✓ Personalized Planning</p>
            <p>✓ Quick WhatsApp Response</p>
          </div>

          <a
            href="https://wa.me/919645622444"
            target="_blank"
            rel="noreferrer"
            className="contact-whatsapp"
          >
            Chat on WhatsApp
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="place"
            placeholder="Place / City"
            value={formData.place}
            onChange={handleChange}
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
          />

          <input
            type="number"
            name="income"
            placeholder="Monthly Income"
            value={formData.income}
            onChange={handleChange}
          />

          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            <option>Term Insurance</option>
            <option>Health Insurance</option>
            <option>Mutual Funds</option>
            <option>Retirement Planning</option>
          </select>

          {(formData.service === "Term Insurance" ||
            formData.service === "Health Insurance") && (
            <>
              <input
                type="number"
                name="familyMembers"
                placeholder="Number of Family Members"
                value={formData.familyMembers}
                onChange={handleChange}
              />

              <input
                type="text"
                name="familyAges"
                placeholder="Family Ages (35,32,8,5)"
                value={formData.familyAges}
                onChange={handleChange}
              />
            </>
          )}

          {formData.service === "Mutual Funds" && (
            <>
              <input
                type="number"
                name="investmentAmount"
                placeholder="Monthly Investment Amount"
                value={formData.investmentAmount}
                onChange={handleChange}
              />

              <select
                name="riskAppetite"
                value={formData.riskAppetite}
                onChange={handleChange}
              >
                <option value="">Risk Appetite</option>
                <option>Conservative</option>
                <option>Moderate</option>
                <option>Aggressive</option>
              </select>
            </>
          )}

          {formData.service === "Retirement Planning" && (
            <>
              <input
                type="number"
                name="currentSavings"
                placeholder="Current Savings"
                value={formData.currentSavings}
                onChange={handleChange}
              />

              <input
                type="number"
                name="retirementAge"
                placeholder="Target Retirement Age"
                value={formData.retirementAge}
                onChange={handleChange}
              />
            </>
          )}

          <textarea
            rows="5"
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="contact-submit"
          >
            Submit Assessment
          </button>

        </form>
      </div>
    </section>
  );
}

export default Contact;