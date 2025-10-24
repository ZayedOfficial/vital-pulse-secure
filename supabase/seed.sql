-- Seed data for testing the healthcare system
-- This creates demo users, doctors, patients, and appointments

-- Note: In production, users would be created through the auth.signUp() method
-- This seed data is for development/testing purposes only

-- Insert sample doctors (assuming users are created via auth)
-- You'll need to create these users first via the signup form or auth system
-- Then update the user_id values below with actual user IDs

-- Example seed data structure (update with real user IDs after signup):

-- INSERT INTO public.doctors (user_id, specialization, experience_years, bio, rating, total_patients_handled, rare_cases_handled, is_available)
-- VALUES
--   ('user-id-1', 'cardiology', 15, 'Experienced cardiologist specializing in heart disease and arrhythmias', 4.8, 500, 45, true),
--   ('user-id-2', 'neurology', 12, 'Specialist in neurological disorders and rare brain conditions', 4.7, 380, 62, true),
--   ('user-id-3', 'orthopedics', 10, 'Expert in bone and joint disorders, sports medicine', 4.6, 420, 18, false),
--   ('user-id-4', 'pediatrics', 8, 'Caring for children with various health conditions', 4.9, 650, 8, true),
--   ('user-id-5', 'oncology', 20, 'Cancer specialist with experience in rare cancer types', 4.9, 300, 95, true);

-- To use this seed data:
-- 1. Register users through the signup form with doctor role
-- 2. Get their user IDs from the auth.users or profiles table
-- 3. Update the INSERT statements above with the actual user IDs
-- 4. Run this SQL in the SQL editor

-- Example doctor availability
-- INSERT INTO public.doctor_availability (doctor_id, day_of_week, start_time, end_time, is_active)
-- SELECT 
--   d.id,
--   generate_series(1, 5) as day_of_week, -- Monday to Friday
--   '09:00:00'::time,
--   '17:00:00'::time,
--   true
-- FROM public.doctors d
-- WHERE d.user_id = 'doctor-user-id';

-- For a quick start, you can use the registration form to create:
-- 1. An admin user (admin@hospital.com)
-- 2. A doctor user (doctor@hospital.com) - then add doctor details via SQL
-- 3. A patient user (patient@hospital.com) - then add patient details via SQL

-- After creating users, you can query their IDs:
-- SELECT id, email FROM auth.users;
-- Then use those IDs to insert into doctors/patients tables