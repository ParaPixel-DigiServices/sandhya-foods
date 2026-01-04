export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F6EEDC]">
      {/* Hero Section */}
      <section className="bg-[#7A1A14] text-white pt-32 sm:pt-36 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl text-[#D4AF37] mb-4 tracking-wide">
            Shipping Policy
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Last updated: January 4, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              This shipping policy explains how Sandhya Foods operates its shipping procedures and how we strive to meet your expectations with every order. Whether you're a first-time buyer or a returning customer, we want to ensure that your experience with us is smooth and satisfactory, right from placing your order to the moment it arrives at your doorstep.
            </p>
            <p className="text-[#2A1E1A] leading-relaxed">
              Please read this shipping policy together with our terms and conditions to familiarize yourself with the rest of our general guidelines.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-[#D4AF37]/30">
            <h2 className="font-royal text-xl sm:text-2xl text-[#7A1A14] mb-4">
              Table of Contents
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-[#2A1E1A]">
              <li><a href="#shipping-delivery" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">Shipping and Delivery Options</a></li>
              <li><a href="#delayed-orders" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">Delayed Orders</a></li>
              <li><a href="#returns-exchanges" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">Returns and Exchanges</a></li>
              <li><a href="#contact" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">Contact Information</a></li>
            </ol>
          </div>

          {/* 1. Shipping and Delivery Options */}
          <div id="shipping-delivery" className="mb-8 scroll-mt-24">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              1. Shipping and Delivery Options
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed mb-6">
              We offer a variety of shipping options to suit the needs of our customers.
            </p>

            {/* Shipping Methods */}
            <div className="mb-6">
              <h3 className="font-royal text-xl sm:text-2xl text-[#7A1A14] mb-4">
                Shipping Methods
              </h3>
              <p className="text-[#2A1E1A] leading-relaxed mb-4">
                We offer a variety of shipping options to suit the needs of our customers:
              </p>
              
              <div className="bg-white p-6 rounded-xl border-l-4 border-[#7A1A14] mb-6">
                <h4 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Standard Shipping
                </h4>
                <p className="text-[#2A1E1A] leading-relaxed mb-2">
                  Delivery Time: <strong>5 to 10 business days</strong>
                </p>
                <p className="text-[#2A1E1A] leading-relaxed text-sm">
                  We strive for a swift preparation process and orders are typically processed and dispatched within 3 to 5 business days so that customers can receive their items promptly.
                </p>
              </div>
            </div>

            {/* In-Store Pickups */}
            <div className="mb-6">
              <h3 className="font-royal text-xl sm:text-2xl text-[#7A1A14] mb-4">
                In-Store Pickups
              </h3>
              <p className="text-[#2A1E1A] leading-relaxed mb-4">
                We offer a convenient local pickup option for those who prefer to collect their orders in person. It is designed to provide a fast and efficient way for local customers to receive their products without waiting for home delivery.
              </p>
              
              <div className="bg-[#D4AF37]/10 p-6 rounded-xl border border-[#D4AF37]/30">
                <div className="space-y-3 text-[#2A1E1A]">
                  <p>
                    <strong>Ready for Pickup:</strong> Orders are typically ready within 3 to 5 business days.
                  </p>
                  <p>
                    <strong>Pickup Hours:</strong> Monday to Friday, 9:00 AM to 5:00 PM
                  </p>
                  <p>
                    <strong>Pickup Location:</strong><br/>
                    Sandhya Foods<br/>
                    Plot No. 18, Baldev Nagar, Mata Ka Than Road,<br/>
                    Magra Punjala, Jodhpur, Rajasthan 342001
                  </p>
                  <p className="text-sm italic">
                    This process helps to ensure that orders are safely and accurately handed over to the right person.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Delayed Orders */}
          <div id="delayed-orders" className="mb-8 scroll-mt-24">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              2. Delayed Orders
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              Unexpected delays can occur due to various reasons such as logistic challenges, inclement weather, high demand, or carrier issues. We are committed to handling these situations with transparency and efficiency.
            </p>
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              In the event of a delay, our priority is to keep you informed. We will promptly notify you with updates on the status of your order and the expected new delivery time. Our goal is to provide clear and accurate information so you can plan accordingly.
            </p>
            
            <div className="bg-white p-6 rounded-xl border-2 border-[#7A1A14]/20">
              <h4 className="font-semibold text-lg text-[#7A1A14] mb-3">
                Your Options for Delayed Orders:
              </h4>
              <p className="text-[#2A1E1A] leading-relaxed">
                Understanding the inconvenience caused by delays, we offer options to maintain your satisfaction. If your order is significantly delayed, you will have the choice to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#2A1E1A] mt-3">
                <li>Continue with the order</li>
                <li>Modify your order</li>
                <li>Cancel it for a full refund</li>
              </ul>
              <p className="text-[#2A1E1A] leading-relaxed mt-3">
                Our customer service team is always available to assist with any changes to your order.
              </p>
            </div>
          </div>

          {/* 3. Returns and Exchanges */}
          <div id="returns-exchanges" className="mb-8 scroll-mt-24">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              3. Returns and Exchanges
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed">
              If you have any questions about refunds, returns or exchanges, please review our <a href="/returns" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors font-semibold underline">Return and Refund Policy</a>.
            </p>
          </div>

          {/* 4. Contact Information */}
          <div id="contact" className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#D4AF37] shadow-lg scroll-mt-24">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              4. Contact Information
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              If you have any questions or concerns regarding our shipping policy, we encourage you to contact us using the details below:
            </p>
            <div className="space-y-2 text-[#2A1E1A]">
              <p><strong>Company:</strong> Sandhya Foods</p>
              <p><strong>Email:</strong> <a href="mailto:info@sandhyafoods.com" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">info@sandhyafoods.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+918005511786" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">+91 80055 11786</a></p>
              <p><strong>Address:</strong> Plot No. 18, Baldev Nagar, Mata Ka Than Road, Magra Punjala, Jodhpur, Rajasthan 342001</p>
            </div>
          </div>

          {/* Last Updated Note */}
          <div className="text-center text-sm text-[#2A1E1A]/60 italic">
            This document was last updated on January 4, 2026.
          </div>

        </div>
      </section>
    </div>
  )
}