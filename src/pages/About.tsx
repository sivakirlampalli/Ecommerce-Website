import React from 'react'
import { Heart, Shield, Users, Award } from 'lucide-react'

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passion for Play',
      description: 'We believe in the power of play to inspire creativity and learning in children of all ages.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety First',
      description: 'Every toy is carefully tested and meets the highest safety standards to ensure worry-free play.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Family Focused',
      description: 'We understand families and strive to bring joy and connection through our carefully curated selection.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Promise',
      description: 'We partner with trusted brands to offer only the highest quality toys that last for generations.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About ToyLand</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Where imagination meets quality, and every toy tells a story of joy and wonder
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, ToyLand began as a small family business with a simple mission: to bring the highest quality toys to families everywhere. What started as a passion project has grown into a trusted destination for parents, educators, and children alike.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that play is not just entertainment – it's essential for healthy development, creativity, and learning. That's why we carefully curate our selection to include only toys that inspire, educate, and delight.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve families across the country, offering everything from classic wooden toys to the latest educational games, all with the same commitment to quality and safety that has defined us from the beginning.
              </p>
            </div>
            <div className="lg:order-first">
              <img
                src="https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg"
                alt="Children playing with toys"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            To inspire creativity, learning, and joy through carefully curated toys that meet the highest standards of quality and safety, while supporting families in creating meaningful play experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Happy Families</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Quality Toys</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind ToyLand
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg' },
              { name: 'Michael Chen', role: 'Product Manager', image: 'https://images.pexels.com/photos/163077/mario-luigi-yoschi-figures-163077.jpeg' },
              { name: 'Emily Rodriguez', role: 'Customer Success', image: 'https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About