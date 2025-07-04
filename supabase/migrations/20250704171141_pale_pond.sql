/*
  # E-commerce Schema Setup for Toy Store

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `category` (text)
      - `age_range` (text)
      - `brand` (text)
      - `image_url` (text)
      - `stock_quantity` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `total_amount` (decimal)
      - `status` (text)
      - `shipping_address` (jsonb)
      - `created_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Cart items can only be accessed by the owner
    - Orders can only be accessed by the owner
</sql>

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  age_range text,
  brand text,
  image_url text,
  stock_quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',
  shipping_address jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products are readable by everyone
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Cart items can only be accessed by the owner
CREATE POLICY "Users can manage their own cart items"
  ON cart_items
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders can only be accessed by the owner
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Order items can only be accessed by the order owner
CREATE POLICY "Users can view their own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Insert sample toy products
INSERT INTO products (name, description, price, category, age_range, brand, image_url, stock_quantity) VALUES
('Super Robot Action Figure', 'Transform and battle with this amazing robot figure with LED lights and sound effects.', 29.99, 'Action Figures', '6-12 years', 'ToyTech', 'https://images.pexels.com/photos/163077/mario-luigi-yoschi-figures-163077.jpeg', 50),
('Princess Castle Playset', 'Beautiful castle with multiple rooms, furniture, and princess figures included.', 79.99, 'Dolls & Playsets', '4-10 years', 'DreamToys', 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg', 25),
('Educational Building Blocks', 'STEM learning blocks that teach engineering and problem-solving skills.', 45.99, 'Educational', '3-8 years', 'LearnFun', 'https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg', 75),
('Remote Control Race Car', 'High-speed RC car with 360-degree stunts and LED headlights.', 59.99, 'Vehicles', '8-14 years', 'SpeedMaster', 'https://images.pexels.com/photos/35619/capri-ford-oldtimer-automotive.jpg', 30),
('Magical Art Set', 'Complete art supplies with watercolors, brushes, and drawing pad.', 24.99, 'Arts & Crafts', '5-12 years', 'CreativeKids', 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg', 60),
('Dinosaur Explorer Kit', 'Dig up dinosaur fossils and learn about prehistoric creatures.', 34.99, 'Educational', '6-12 years', 'DinoWorld', 'https://images.pexels.com/photos/163077/mario-luigi-yoschi-figures-163077.jpeg', 40),
('Electronic Learning Tablet', 'Interactive tablet with games, puzzles, and educational content.', 89.99, 'Educational', '3-7 years', 'SmartToys', 'https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg', 35),
('Plush Teddy Bear', 'Super soft and cuddly teddy bear perfect for bedtime.', 19.99, 'Plush Toys', '0-5 years', 'CuddleTime', 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg', 100);