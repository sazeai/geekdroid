-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create tools table if it doesn't exist
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL DEFAULT 0,
  image TEXT NOT NULL,
  affiliate_link TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  pricing TEXT NOT NULL,
  is_new BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create a secure function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Policies for profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (is_admin());

-- Policies for tools table
DROP POLICY IF EXISTS "Anyone can view approved tools" ON tools;
CREATE POLICY "Anyone can view approved tools"
  ON tools FOR SELECT
  USING (status = 'approved');

DROP POLICY IF EXISTS "Admins can manage all tools" ON tools;
CREATE POLICY "Admins can manage all tools"
  ON tools FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Users can submit tools" ON tools;
CREATE POLICY "Users can submit tools"
  ON tools FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own submissions" ON tools;
CREATE POLICY "Users can view their own submissions"
  ON tools FOR SELECT
  USING (submitted_by = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS tools_category_idx ON tools(category);
CREATE INDEX IF NOT EXISTS tools_status_idx ON tools(status);
CREATE INDEX IF NOT EXISTS tools_submitted_by_idx ON tools(submitted_by);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);