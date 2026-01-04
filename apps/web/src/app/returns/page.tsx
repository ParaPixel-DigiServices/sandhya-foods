export default function ReturnsRefundPage() {
  return (
    <div className="min-h-screen bg-[#F6EEDC]">
      {/* Hero Section */}
      <section className="bg-[#7A1A14] text-white pt-32 sm:pt-36 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl text-[#D4AF37] mb-4 tracking-wide">
            Return and Refund Policy
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
            <p className="text-[#2A1E1A] leading-relaxed">
              At Sandhya Foods, we strive to provide high-quality products and ensure that our customers are satisfied with their purchase. However, if you are not completely satisfied with your purchase, we are happy to offer returns and refunds under the following conditions:
            </p>
          </div>

          {/* 1. Return Policy */}
          <div className="mb-8">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              1. Return Policy
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              We accept returns of products purchased from our website under the following conditions:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Eligibility for Return
                </h3>
                <p className="text-[#2A1E1A] leading-relaxed">
                  Returns are only accepted for products that are unopened, unused, and in their original packaging. Products that have been opened or used may not be eligible for a return.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Time Frame for Return
                </h3>
                <p className="text-[#2A1E1A] leading-relaxed">
                  Returns must be requested within <strong>7 days</strong> from the date of receipt of the product.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Condition of the Product
                </h3>
                <p className="text-[#2A1E1A] leading-relaxed">
                  The product must be returned in its original condition, with all tags, labels, and packaging intact. Any product that is damaged, altered, or used will not be accepted for return.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Non-Returnable Products
                </h3>
                <p className="text-[#2A1E1A] leading-relaxed">
                  Certain products, including but not limited to perishable goods, food items, or customized items, may not be eligible for return. Please verify the eligibility of your product before initiating a return.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Return Process */}
          <div className="mb-8">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              2. Return Process
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              To initiate a return, please follow these steps:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#7A1A14] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                    Contact Us
                  </h3>
                  <p className="text-[#2A1E1A] leading-relaxed">
                    Reach out to our customer service team within 7 days of receiving your order. You can contact us via email at <a href="mailto:info@sandhyafoods.com" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors font-semibold">info@sandhyafoods.com</a> or call us at <a href="tel:+918005511786" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors font-semibold">+91 80055 11786</a>. Please include your order number, the reason for the return, and photos of the product (if applicable).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#7A1A14] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                    Return Authorization
                  </h3>
                  <p className="text-[#2A1E1A] leading-relaxed">
                    After reviewing your request, we will send you a Return Authorization (RA) number and instructions on how to return the product.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#7A1A14] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                    Ship the Product Back
                  </h3>
                  <p className="text-[#2A1E1A] leading-relaxed">
                    You are responsible for the return shipping cost unless the return is due to a defect, damage, or incorrect item received. We recommend using a trackable shipping service to ensure the safe return of the product.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#7A1A14] text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                    Inspection and Approval
                  </h3>
                  <p className="text-[#2A1E1A] leading-relaxed">
                    Once we receive the returned product, we will inspect it to ensure that it meets the return criteria. If the product is in acceptable condition, we will process the refund.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Refund Policy */}
          <div className="mb-8">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              3. Refund Policy
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              Once your return is approved, we will initiate the refund process as follows:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Refund Method
                </h3>
                <p className="text-[#2A1E1A] leading-relaxed">
                  Refunds will be issued to the original payment method used for the purchase. Depending on your payment provider, it may take 5-10 business days for the refund to appear in your account.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Refund Amount
                </h3>
                <p className="text-[#2A1E1A] leading-relaxed">
                  The refund amount will be for the purchase price of the product only. Any shipping charges are non-refundable unless the return is due to an error on our part (e.g., damaged or incorrect items).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">
                  Partial Refunds
                </h3>
                <p className="text-[#2A1E1A] leading-relaxed">
                  If the product is returned in a used or damaged condition, a partial refund may be issued.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Damaged or Defective Products */}
          <div className="mb-8 bg-[#D4AF37]/10 p-6 rounded-xl border border-[#D4AF37]/30">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              4. Damaged or Defective Products
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed">
              If you receive a damaged or defective product, please notify us within <strong>48 hours</strong> of delivery. We will either offer you a replacement or process a full refund for the damaged/defective item. You may also be required to send the product back to us for inspection.
            </p>
          </div>

          {/* 5. Exchanges */}
          <div className="mb-8">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              5. Exchanges
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed">
              We currently do not offer direct exchanges. If you wish to exchange a product, you will need to return the original product and place a new order for the desired item.
            </p>
          </div>

          {/* 6. Cancellation Policy */}
          <div className="mb-8">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              6. Cancellation Policy
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed">
              You may cancel your order at any time before it is shipped. Once your order has been shipped, it can no longer be canceled, but you may initiate a return once you receive the product.
            </p>
          </div>

          {/* 7. Contact Information */}
          <div className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#D4AF37] shadow-lg">
            <h2 className="font-royal text-2xl sm:text-3xl text-[#7A1A14] mb-4 tracking-wide">
              7. Contact Information
            </h2>
            <p className="text-[#2A1E1A] leading-relaxed mb-4">
              For any questions regarding returns, refunds, or cancellations, please contact us at:
            </p>
            <div className="space-y-2 text-[#2A1E1A]">
              <p><strong>Company:</strong> Sandhya Foods</p>
              <p><strong>Address:</strong> Plot No. 18, Baldev Nagar, Mata Ka Than Road, Magra Punjala, Jodhpur, Rajasthan 342001</p>
              <p><strong>Email:</strong> <a href="mailto:info@sandhyafoods.com" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">info@sandhyafoods.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+918005511786" className="text-[#7A1A14] hover:text-[#D4AF37] transition-colors">+91 80055 11786</a></p>
            </div>
          </div>

          {/* Closing Message */}
          <div className="mb-8 bg-[#7A1A14]/5 p-6 rounded-xl border border-[#7A1A14]/20">
            <p className="text-[#2A1E1A] leading-relaxed font-medium text-center">
              We appreciate your business and want you to be completely satisfied with your purchase. If you need further assistance, feel free to reach out to us.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}