import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  time: z.string().min(1, "Please select a preferred time"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms"
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await fetch("https://formsubmit.co/ajax/mailtosalahuvt@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `New Contact Request: ${data.name}`,
          ...data
        })
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[var(--color-primary)] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-4xl font-[var(--font-heading)] mb-6">Book a Free Consultation</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Take the first step towards absolute financial clarity. Schedule a zero-obligation consultation to discuss your wealth goals.
            </p>
            <div className="space-y-6 text-gray-300">
              <p><strong>Email:</strong> mailtosalahuvt@gmail.com</p>
              <p><strong>Phone:</strong> +91 9645622444</p>
              <p><strong>Location:</strong> Kerala, India</p>
            </div>
          </div>

          <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <h3 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)]">Request Sent Successfully!</h3>
                <p className="text-gray-600">Our advisor will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input {...register("name")} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)]" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input {...register("phone")} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)]" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input type="email" {...register("email")} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)]" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Service Interest</label>
                    <select {...register("service")} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)] bg-white">
                      <option value="">Select Service</option>
                      <option value="Wealth Management">Wealth Management</option>
                      <option value="Mutual Funds">Mutual Funds</option>
                      <option value="Insurance">Insurance Planning</option>
                      <option value="Retirement">Retirement Planning</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Time to Call</label>
                  <select {...register("time")} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)] bg-white">
                    <option value="">Select Time</option>
                    <option value="Morning">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon">Afternoon (1 PM - 5 PM)</option>
                    <option value="Evening">Evening (6 PM - 8 PM)</option>
                  </select>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea {...register("message")} rows={4} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--color-secondary)]"></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" {...register("consent")} className="mt-1" />
                  <label className="text-sm text-gray-600">I consent to being contacted by SecureLife Advisors regarding my inquiry and agree to the Privacy Policy.</label>
                </div>
                {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-medium hover:bg-[#152e52] transition disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? "Sending Request..." : <><Send className="w-5 h-5" /> Submit Request</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
