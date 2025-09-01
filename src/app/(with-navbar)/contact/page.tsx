import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { LuMapPin, LuPhone, LuMail, LuSend } from "react-icons/lu";

const ContactPage = () => {
  const branches = [
    {
      name: "New York Headquarters",
      address: "123 Learning Lane, New York, NY 10001",
      phone: "+1 (212) 555-0123",
      email: "ny@lmsplatform.com",
      imageUrl: "/city-1.webp",
    },
    {
      name: "London Campus",
      address: "456 Education Square, London, W1A 1AA",
      phone: "+44 20 7946 0958",
      email: "london@lmsplatform.com",
      imageUrl: "/city-2.webp",
    },
    {
      name: "Tokyo Innovation Hub",
      address: "789 Knowledge Ave, Shibuya, Tokyo 150-0002",
      phone: "+81 3-4567-8901",
      email: "tokyo@lmsplatform.com",
      imageUrl: "/city-3.webp",
    },
  ];

  return (
    <div className="bg-background mt-[88px] lg:mt-[140px]">
      <main>
        <section className="bg-gray-100 dark:bg-background relative  py-20  ">
          <div className="container flex items-center gap-4">
            <div className="space-y-4">
              <h2 className="font-semibold text-[30px] lg:text-[35px] xl:text-[45px] leading-tight">
                Connect with us
              </h2>
              <p className="mb-4 font-[500px] lg:text-lg text-gray-500 leading-snug">
                Want to chat? We’d love to hear from you! Get in touch with our
                Customer Success Team to inquire about speaking events,
                advertising rates, or just say hello.
              </p>
              <Button>Copy Email</Button>
            </div>
            <div className="w-[600px] h-[400px] relative">
              <Image
                src="/contact-1.webp"
                alt="Contact"
                fill
                className="rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container ">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold ">
                Our branches all over the world.
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Find our teams across the globe. We&apos;re ready to support you
                from a location near you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {branches.map((branch, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <Image
                    src={branch.imageUrl}
                    alt={`A photo of the city for our ${branch.name}`}
                    className="w-full h-48 object-cover"
                    width={600}
                    height={400}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{branch.name}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <LuMapPin
                          size={18}
                          className="mr-3 mt-1 text-primary flex-shrink-0"
                        />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center">
                        <LuPhone
                          size={18}
                          className="mr-3 text-primary flex-shrink-0"
                        />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <LuMail
                          size={18}
                          className="mr-3 text-primary flex-shrink-0"
                        />
                        <span>{branch.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold ">
                  Send Us a Message
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Have a specific question? Fill out the form below and
                  we&apos;ll get back to you as soon as possible.
                </p>
              </div>
              <form
                action="#"
                method="POST"
                className="space-y-6 bg-gray-100 dark:bg-card p-8 rounded-2xl shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="John Doe"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="you@example.com"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none "
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Regarding course enrollment"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none "
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    name="message"
                    id="message"
                    rows={6}
                    placeholder="Your message here..."
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none "
                  ></Textarea>
                </div>
                <div className="text-right">
                  <Button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none  transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Send Message
                    <LuSend size={20} className="ml-3" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
