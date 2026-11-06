// Sample data: clinics, hospitals and doctors (replace with API calls in the full system)
const DOCS=[
{n:"Dr. Ananya Rao",s:"General Physician",h:"Sunrise Care Hospital",a:"Kunigal",f:300,w:4,x:8,t:["09:00","09:20","09:40","10:00","10:20","11:00"]},
{n:"Dr. Mahesh Gowda",s:"Cardiologist",h:"Sunrise Care Hospital",a:"Kunigal",f:700,w:9,x:7,t:["10:00","10:30","11:00","15:00","15:30"]},
{n:"Dr. Fatima Sheikh",s:"Pediatrician",h:"Lakeview Clinic",a:"Kunigal",f:400,w:2,x:10,t:["09:30","10:00","10:30","11:00","11:30","12:00"]},
{n:"Dr. Ravi Kumar",s:"Orthopedic",h:"City Central Hospital",a:"Tumakuru",f:600,w:12,x:6,t:["11:00","11:30","12:00","16:00"]},
{n:"Dr. Sneha Patil",s:"Dermatologist",h:"City Central Hospital",a:"Tumakuru",f:500,w:5,x:9,t:["10:00","10:20","10:40","11:00","14:00"]},
{n:"Dr. Imran Pasha",s:"General Physician",h:"Green Cross Hospital",a:"Tumakuru",f:350,w:7,x:8,t:["09:00","09:30","10:00","10:30"]},
{n:"Dr. Lakshmi Narayan",s:"Gynecologist",h:"Green Cross Hospital",a:"Nelamangala",f:550,w:3,x:8,t:["10:00","10:30","11:00","11:30"]},
{n:"Dr. Arjun Nair",s:"ENT Specialist",h:"Metro Health Centre",a:"Nelamangala",f:450,w:10,x:6,t:["12:00","12:30","16:00","16:30"]}
];
DOCS[2].k="Clinic";
DOCS.push(
{n:"Dr. Kavitha Murthy",s:"General Physician",h:"RR Nagar Family Clinic",a:"Rajarajeshwari Nagar",k:"Clinic",f:250,w:3,x:7,t:["09:00","09:15","09:30","09:45","10:00","10:15"]},
{n:"Dr. Sandeep Hegde",s:"Dentist",h:"SmileCare Dental Clinic",a:"Rajarajeshwari Nagar",k:"Clinic",f:400,w:2,x:20,t:["10:00","10:30","11:00","11:30","12:00"]},
{n:"Dr. Meera Iyer",s:"Pediatrician",h:"Little Steps Child Clinic",a:"Rajarajeshwari Nagar",k:"Clinic",f:350,w:5,x:9,t:["09:30","10:00","10:30","11:00","11:30"]},
{n:"Dr. Shalini Rao",s:"Gynecologist",h:"Mother & Care Clinic",a:"Rajarajeshwari Nagar",k:"Clinic",f:500,w:4,x:12,t:["10:00","10:30","11:00","16:00","16:30"]},
{n:"Dr. Naveen Prasad",s:"Orthopedic",h:"RR Nagar Medical Centre",a:"Rajarajeshwari Nagar",k:"Hospital",f:600,w:8,x:10,t:["11:00","11:30","12:00","17:00"]},
{n:"Dr. Anil Kumar",s:"General Physician",h:"Kengeri Health Clinic",a:"Kengeri",k:"Clinic",f:250,w:6,x:7,t:["09:00","09:30","10:00","10:30"]},
{n:"Dr. Pooja Bhat",s:"Dermatologist",h:"SkinFirst Clinic",a:"Jayanagar",k:"Clinic",f:550,w:3,x:10,t:["10:00","10:30","11:00","15:00"]},
{n:"Dr. vijaya Lakshmi Joshi",s:"sepm theray",h:"sepm hospital",a:"Uttarahalli",k:"clinic",f:250,w:6,x:7,t:["09:00","09:30","10:00","10:30"]}
);
