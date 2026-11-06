// Sample doctor accounts, patients, slots and consultation times (one object per doctor)
const DOCS={
 ananya:{pw:"ananya@123",name:"Dr. Ananya Rao",ini:"AR",spec:"General Physician",hosp:"Sunrise Care Hospital",area:"Kunigal",
  P:[mk(101,"Arjun Reddy","10:00","Fever and cold","done"),mk(102,"Kavya Nair","10:15","Follow-up visit","done"),mk(103,"Mohammed Faiz","10:30","Blood sugar check","waiting"),mk(104,"Pooja Shetty","10:45","Headache","waiting"),mk(105,"Harish Gowda","11:00","Back pain","waiting"),mk(106,"Anitha Rao","11:15","Routine check-up","waiting")],
  SL:["10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45"],blocked:["11:45"],durs:[11,9],nextTok:107},
 mahesh:{pw:"mahesh@123",name:"Dr. Mahesh Gowda",ini:"MG",spec:"Cardiologist",hosp:"Sunrise Care Hospital",area:"Kunigal",
  P:[mk(201,"Venkatesh Murthy","10:00","Chest discomfort","done"),mk(202,"Sunita Joshi","10:30","ECG review","waiting"),mk(203,"Basavaraj Patil","11:00","High blood pressure","waiting"),mk(204,"Rekha Prakash","11:30","Palpitations","waiting"),mk(205,"Gopal Krishna","15:00","Post-surgery follow-up","waiting")],
  SL:["10:00","10:30","11:00","11:30","15:00","15:30"],blocked:["15:30"],durs:[18,22,20],nextTok:206},
 fatima:{pw:"fatima@123",name:"Dr. Fatima Sheikh",ini:"FS",spec:"Pediatrician",hosp:"Lakeview Clinic",area:"Kunigal",
  P:[mk(301,"Aarav Iyer (4 yrs)","09:30","Vaccination","done"),mk(302,"Diya Menon (2 yrs)","10:00","Cough and fever","done"),mk(303,"Rohan Das (7 yrs)","10:30","Stomach ache","waiting"),mk(304,"Sara Khan (1 yr)","11:00","Growth check","waiting"),mk(305,"Ishaan Verma (5 yrs)","11:30","Ear pain","waiting"),mk(306,"Myra Pillai (3 yrs)","12:00","Skin rash","waiting")],
  SL:["09:30","10:00","10:30","11:00","11:30","12:00"],blocked:[],durs:[8,10,9],nextTok:307},
 ravi:{pw:"ravi@123",name:"Dr. Ravi Kumar",ini:"RK",spec:"Orthopedic",hosp:"City Central Hospital",area:"Tumakuru",
  P:[mk(401,"Prakash Hegde","11:00","Knee pain","done"),mk(402,"Nandini Rao","11:30","Wrist fracture follow-up","waiting"),mk(403,"Satish Naik","12:00","Shoulder stiffness","waiting"),mk(404,"Farah Begum","16:00","Lower back pain","waiting")],
  SL:["11:00","11:30","12:00","12:30","16:00","16:30"],blocked:["12:30"],durs:[14,16],nextTok:405}
  
  
};
Object.values(DOCS).forEach(d=>{d.blocked=new Set(d.blocked);d.start=null;d.avail=true});
let D=null,timer=null;
