// Exercise Database for TrackFit AI
const exercisesData = {
    arms: {
        beginner: [
            {
                name: "Wall Push-ups",
                description: "Stand arm's length from wall, place palms flat against wall, push body away and back.",
                duration: "3 sets x 10 reps",
                calories: "15-20 cal"
            },
            {
                name: "Arm Circles",
                description: "Extend arms to sides, make small circles forward then backward.",
                duration: "2 sets x 30 seconds each direction",
                calories: "10-15 cal"
            },
            {
                name: "Modified Push-ups (Knee)",
                description: "Push-ups from knees instead of toes, maintaining straight line from knees to head.",
                duration: "3 sets x 8-12 reps",
                calories: "20-25 cal"
            },
            {
                name: "Arm Raises",
                description: "Raise arms to shoulder height, hold briefly, then lower slowly.",
                duration: "3 sets x 15 reps",
                calories: "10-12 cal"
            },
            {
                name: "Wrist Flexor Stretch",
                description: "Extend arm, gently pull fingers back to stretch forearm muscles.",
                duration: "Hold 30 seconds each arm",
                calories: "5 cal"
            }
        ],
        intermediate: [
            {
                name: "Standard Push-ups",
                description: "Classic push-up position, lower chest to ground and push back up.",
                duration: "4 sets x 12-15 reps",
                calories: "30-40 cal"
            },
            {
                name: "Diamond Push-ups",
                description: "Push-ups with hands in diamond shape under chest for tricep focus.",
                duration: "3 sets x 8-10 reps",
                calories: "25-35 cal"
            },
            {
                name: "Pike Push-ups",
                description: "Downward dog position, lower head toward hands, push back up.",
                duration: "3 sets x 10-12 reps",
                calories: "35-45 cal"
            },
            {
                name: "Tricep Dips (Chair)",
                description: "Hands on chair edge, lower body by bending arms, push back up.",
                duration: "4 sets x 12-15 reps",
                calories: "40-50 cal"
            },
            {
                name: "Plank to Push-up",
                description: "Start in plank, move to push-up position, back to plank.",
                duration: "3 sets x 10 reps",
                calories: "45-55 cal"
            }
        ],
        professional: [
            {
                name: "One-Arm Push-ups",
                description: "Advanced push-up using only one arm, requires significant strength.",
                duration: "3 sets x 5-8 reps each arm",
                calories: "60-80 cal"
            },
            {
                name: "Handstand Push-ups",
                description: "Push-ups performed in handstand position against wall.",
                duration: "4 sets x 5-10 reps",
                calories: "70-90 cal"
            },
            {
                name: "Archer Push-ups",
                description: "Wide push-up shifting weight to one arm at a time.",
                duration: "4 sets x 6-10 reps each side",
                calories: "65-85 cal"
            },
            {
                name: "Explosive Push-ups",
                description: "Push-up with explosive force to lift hands off ground.",
                duration: "5 sets x 8-12 reps",
                calories: "80-100 cal"
            },
            {
                name: "Hindu Push-ups",
                description: "Flowing movement combining push-up with upward dog stretch.",
                duration: "4 sets x 10-15 reps",
                calories: "75-95 cal"
            }
        ]
    },
    
    triceps: {
        beginner: [
            {
                name: "Tricep Dips (Ground)",
                description: "Sit on ground, hands behind you, lift hips and dip down.",
                duration: "3 sets x 8-10 reps",
                calories: "15-20 cal"
            },
            {
                name: "Overhead Arm Extension",
                description: "Raise one arm overhead, bend at elbow, stretch tricep.",
                duration: "Hold 30 seconds each arm",
                calories: "5-8 cal"
            },
            {
                name: "Wall Tricep Extension",
                description: "Face wall, place forearms against wall, push away using triceps.",
                duration: "3 sets x 12 reps",
                calories: "12-18 cal"
            },
            {
                name: "Tricep Kickbacks (No Weight)",
                description: "Bend forward, extend arms back squeezing triceps.",
                duration: "3 sets x 15 reps",
                calories: "10-15 cal"
            },
            {
                name: "Close-Grip Wall Push",
                description: "Wall push-ups with hands close together targeting triceps.",
                duration: "3 sets x 10 reps",
                calories: "15-20 cal"
            }
        ],
        intermediate: [
            {
                name: "Bench Tricep Dips",
                description: "Use bench or chair, lower body by bending arms behind you.",
                duration: "4 sets x 12-15 reps",
                calories: "35-45 cal"
            },
            {
                name: "Close-Grip Push-ups",
                description: "Push-ups with hands closer together to target triceps.",
                duration: "4 sets x 10-12 reps",
                calories: "40-50 cal"
            },
            {
                name: "Tricep Push-ups",
                description: "Push-ups keeping elbows close to body throughout movement.",
                duration: "3 sets x 8-12 reps",
                calories: "35-45 cal"
            },
            {
                name: "Single Arm Tricep Extension",
                description: "One arm overhead extension focusing on controlled movement.",
                duration: "3 sets x 12 reps each arm",
                calories: "25-35 cal"
            },
            {
                name: "Tricep Dips (Elevated Feet)",
                description: "Regular dips with feet elevated on another surface.",
                duration: "4 sets x 10-12 reps",
                calories: "50-60 cal"
            }
        ],
        professional: [
            {
                name: "Single Arm Tricep Dips",
                description: "Advanced dips using only one arm for support.",
                duration: "3 sets x 5-8 reps each arm",
                calories: "60-80 cal"
            },
            {
                name: "Tricep Push-up to Pike",
                description: "Combine tricep push-up with pike movement.",
                duration: "4 sets x 8-10 reps",
                calories: "70-90 cal"
            },
            {
                name: "Tricep Handstand",
                description: "Handstand with tricep-focused lowering and raising.",
                duration: "3 sets x 3-5 reps",
                calories: "80-100 cal"
            },
            {
                name: "Explosive Tricep Push-ups",
                description: "Explosive push-ups focusing on tricep power.",
                duration: "4 sets x 6-10 reps",
                calories: "75-95 cal"
            },
            {
                name: "Ring Tricep Extensions",
                description: "Advanced tricep extensions using suspension rings.",
                duration: "4 sets x 8-12 reps",
                calories: "85-105 cal"
            }
        ]
    },
    
    shoulders: {
        beginner: [
            {
                name: "Shoulder Rolls",
                description: "Roll shoulders backward and forward in controlled circles.",
                duration: "2 sets x 10 each direction",
                calories: "5-8 cal"
            },
            {
                name: "Arm Swings",
                description: "Swing arms across body and back out to sides.",
                duration: "2 sets x 15 reps",
                calories: "8-12 cal"
            },
            {
                name: "Wall Angels",
                description: "Back against wall, move arms up and down like making snow angels.",
                duration: "3 sets x 12 reps",
                calories: "10-15 cal"
            },
            {
                name: "Shoulder Blade Squeezes",
                description: "Squeeze shoulder blades together, hold, then release.",
                duration: "3 sets x 15 reps",
                calories: "8-12 cal"
            },
            {
                name: "Cross-Body Arm Stretches",
                description: "Stretch one arm across body using other arm.",
                duration: "Hold 30 seconds each arm",
                calories: "5 cal"
            }
        ],
        intermediate: [
            {
                name: "Pike Push-ups",
                description: "Downward dog position push-ups targeting shoulders.",
                duration: "4 sets x 10-12 reps",
                calories: "40-50 cal"
            },
            {
                name: "Lateral Raises (No Weight)",
                description: "Raise arms to sides up to shoulder height.",
                duration: "4 sets x 15 reps",
                calories: "25-35 cal"
            },
            {
                name: "Front Raises (No Weight)",
                description: "Raise arms forward to shoulder height.",
                duration: "3 sets x 15 reps",
                calories: "20-30 cal"
            },
            {
                name: "Reverse Fly",
                description: "Bend forward, raise arms to sides squeezing shoulder blades.",
                duration: "4 sets x 12 reps",
                calories: "30-40 cal"
            },
            {
                name: "Shoulder Dislocations",
                description: "Use towel or band, move arms over head and behind back.",
                duration: "3 sets x 10 reps",
                calories: "15-25 cal"
            }
        ],
        professional: [
            {
                name: "Handstand Wall Walk",
                description: "Walk feet up wall into handstand position.",
                duration: "3 sets x 30-60 seconds",
                calories: "60-80 cal"
            },
            {
                name: "Single Arm Pike Push-up",
                description: "Pike push-ups performed with one arm.",
                duration: "3 sets x 5-8 reps each arm",
                calories: "70-90 cal"
            },
            {
                name: "Archer Push-ups (Shoulder Focus)",
                description: "Wide push-ups shifting weight to work shoulders unilaterally.",
                duration: "4 sets x 6-10 reps each side",
                calories: "65-85 cal"
            },
            {
                name: "Hollow Body Rocks",
                description: "Core and shoulder stabilization exercise.",
                duration: "4 sets x 30-45 seconds",
                calories: "50-70 cal"
            },
            {
                name: "Muscle-Up Progression",
                description: "Advanced pulling movement transitioning to dip.",
                duration: "3 sets x 3-5 reps",
                calories: "80-100 cal"
            }
        ]
    },
    
    chest: {
        beginner: [
            {
                name: "Wall Push-ups",
                description: "Stand facing wall, push against wall with arms extended.",
                duration: "3 sets x 10-12 reps",
                calories: "15-20 cal"
            },
            {
                name: "Incline Push-ups (Stairs)",
                description: "Push-ups with hands on elevated surface like stairs.",
                duration: "3 sets x 8-10 reps",
                calories: "20-25 cal"
            },
            {
                name: "Chest Squeeze",
                description: "Palms together in front of chest, press firmly.",
                duration: "3 sets x 15 reps",
                calories: "8-12 cal"
            },
            {
                name: "Arm Circles (Wide)",
                description: "Large arm circles to warm up chest muscles.",
                duration: "2 sets x 15 each direction",
                calories: "10-15 cal"
            },
            {
                name: "Doorway Chest Stretch",
                description: "Place arms on doorframe, step forward to stretch chest.",
                duration: "Hold 30 seconds",
                calories: "5 cal"
            }
        ],
        intermediate: [
            {
                name: "Standard Push-ups",
                description: "Classic push-ups focusing on chest development.",
                duration: "4 sets x 12-15 reps",
                calories: "40-50 cal"
            },
            {
                name: "Wide-Grip Push-ups",
                description: "Push-ups with hands wider than shoulders.",
                duration: "4 sets x 10-12 reps",
                calories: "45-55 cal"
            },
            {
                name: "Decline Push-ups",
                description: "Feet elevated push-ups for upper chest focus.",
                duration: "3 sets x 8-12 reps",
                calories: "50-60 cal"
            },
            {
                name: "Chest Fly (Floor)",
                description: "Lie on floor, arms wide, bring together above chest.",
                duration: "4 sets x 15 reps",
                calories: "25-35 cal"
            },
            {
                name: "Staggered Push-ups",
                description: "One hand forward, one back, alternating positions.",
                duration: "3 sets x 10 reps each side",
                calories: "40-50 cal"
            }
        ],
        professional: [
            {
                name: "One-Arm Push-ups",
                description: "Single arm push-ups requiring exceptional strength.",
                duration: "3 sets x 5-8 reps each arm",
                calories: "70-90 cal"
            },
            {
                name: "Explosive Push-ups",
                description: "Push-ups with explosive force lifting hands off ground.",
                duration: "4 sets x 8-12 reps",
                calories: "80-100 cal"
            },
            {
                name: "Pseudo Planche Push-ups",
                description: "Hands positioned lower, leaning forward significantly.",
                duration: "4 sets x 5-8 reps",
                calories: "85-105 cal"
            },
            {
                name: "Archer Push-ups",
                description: "Wide push-ups shifting weight side to side.",
                duration: "4 sets x 6-10 reps each side",
                calories: "75-95 cal"
            },
            {
                name: "Ring Push-ups",
                description: "Push-ups on unstable rings for increased difficulty.",
                duration: "4 sets x 10-15 reps",
                calories: "90-110 cal"
            }
        ]
    },
    
    back: {
        beginner: [
            {
                name: "Superman Pose",
                description: "Lie face down, lift arms and legs simultaneously.",
                duration: "3 sets x 10 reps",
                calories: "15-20 cal"
            },
            {
                name: "Cat-Cow Stretch",
                description: "On hands and knees, arch and round back alternately.",
                duration: "2 sets x 15 reps",
                calories: "10-15 cal"
            },
            {
                name: "Wall Slides",
                description: "Back against wall, slide arms up and down.",
                duration: "3 sets x 12 reps",
                calories: "12-18 cal"
            },
            {
                name: "Prone Y-Raises",
                description: "Lie face down, raise arms in Y position.",
                duration: "3 sets x 12 reps",
                calories: "15-20 cal"
            },
            {
                name: "Bird Dog",
                description: "Hands and knees, extend opposite arm and leg.",
                duration: "3 sets x 10 reps each side",
                calories: "20-25 cal"
            }
        ],
        intermediate: [
            {
                name: "Reverse Snow Angels",
                description: "Lie face down, move arms like reverse snow angels.",
                duration: "4 sets x 15 reps",
                calories: "25-35 cal"
            },
            {
                name: "Single Arm Row (No Weight)",
                description: "Bent over, pull one arm back squeezing shoulder blade.",
                duration: "4 sets x 12 reps each arm",
                calories: "30-40 cal"
            },
            {
                name: "Inverted Rows (Table)",
                description: "Under table, pull body up using back muscles.",
                duration: "4 sets x 8-12 reps",
                calories: "45-55 cal"
            },
            {
                name: "Good Mornings",
                description: "Hands behind head, hinge at hips keeping back straight.",
                duration: "3 sets x 15 reps",
                calories: "25-35 cal"
            },
            {
                name: "Prone T-Raises",
                description: "Lie face down, raise arms to form T shape.",
                duration: "4 sets x 12 reps",
                calories: "20-30 cal"
            }
        ],
        professional: [
            {
                name: "Pull-ups (Advanced)",
                description: "Full pull-ups with proper form and control.",
                duration: "4 sets x 8-12 reps",
                calories: "60-80 cal"
            },
            {
                name: "Archer Pull-ups",
                description: "Pull-ups shifting weight to one arm.",
                duration: "3 sets x 5-8 reps each side",
                calories: "70-90 cal"
            },
            {
                name: "One-Arm Rows (Advanced)",
                description: "Single arm rows with maximum range of motion.",
                duration: "4 sets x 10-15 reps each arm",
                calories: "65-85 cal"
            },
            {
                name: "Muscle-Up Negatives",
                description: "Controlled lowering from top of muscle-up position.",
                duration: "3 sets x 3-5 reps",
                calories: "80-100 cal"
            },
            {
                name: "Front Lever Progression",
                description: "Advanced gymnastic hold working entire back.",
                duration: "3 sets x 15-30 seconds",
                calories: "75-95 cal"
            }
        ]
    },
    
    abs: {
        beginner: [
            {
                name: "Crunches",
                description: "Basic abdominal crunches lifting shoulders off ground.",
                duration: "3 sets x 15 reps",
                calories: "15-20 cal"
            },
            {
                name: "Knee Raises",
                description: "Lying down, bring knees toward chest.",
                duration: "3 sets x 12 reps",
                calories: "18-25 cal"
            },
            {
                name: "Dead Bug",
                description: "Lie on back, extend opposite arm and leg.",
                duration: "3 sets x 10 reps each side",
                calories: "20-25 cal"
            },
            {
                name: "Modified Plank",
                description: "Plank from knees instead of toes.",
                duration: "3 sets x 20-30 seconds",
                calories: "15-20 cal"
            },
            {
                name: "Standing Marches",
                description: "March in place bringing knees high.",
                duration: "2 sets x 30 seconds",
                calories: "10-15 cal"
            }
        ],
        intermediate: [
            {
                name: "Plank",
                description: "Hold plank position maintaining straight line.",
                duration: "3 sets x 45-60 seconds",
                calories: "25-35 cal"
            },
            {
                name: "Bicycle Crunches",
                description: "Crunches bringing elbow to opposite knee.",
                duration: "4 sets x 20 reps each side",
                calories: "35-45 cal"
            },
            {
                name: "Russian Twists",
                description: "Seated, lean back and twist side to side.",
                duration: "4 sets x 30 reps",
                calories: "30-40 cal"
            },
            {
                name: "Mountain Climbers",
                description: "Plank position, alternate bringing knees to chest.",
                duration: "4 sets x 30 seconds",
                calories: "40-50 cal"
            },
            {
                name: "Leg Raises",
                description: "Lying down, raise straight legs up and down.",
                duration: "3 sets x 15 reps",
                calories: "25-35 cal"
            }
        ],
        professional: [
            {
                name: "Dragon Flag",
                description: "Advanced exercise keeping body straight, lowering slowly.",
                duration: "3 sets x 5-8 reps",
                calories: "60-80 cal"
            },
            {
                name: "Human Flag Progression",
                description: "Side plank progression toward full human flag.",
                duration: "3 sets x 10-20 seconds",
                calories: "70-90 cal"
            },
            {
                name: "Hollow Body Rocks",
                description: "Hollow position rocking back and forth.",
                duration: "4 sets x 30-45 seconds",
                calories: "50-70 cal"
            },
            {
                name: "V-Ups",
                description: "Simultaneously raise arms and legs to form V.",
                duration: "4 sets x 15-20 reps",
                calories: "55-75 cal"
            },
            {
                name: "Planche Lean",
                description: "Lean forward in plank building toward planche.",
                duration: "4 sets x 20-30 seconds",
                calories: "65-85 cal"
            }
        ]
    },
    
    lats: {
        beginner: [
            {
                name: "Lat Stretch (Doorway)",
                description: "Hold doorway, lean away to stretch lats.",
                duration: "Hold 30 seconds each side",
                calories: "5-8 cal"
            },
            {
                name: "Wall Lat Pulldowns",
                description: "Face wall, pull arms down against imaginary resistance.",
                duration: "3 sets x 15 reps",
                calories: "12-18 cal"
            },
            {
                name: "Prone Pull-ins",
                description: "Lie face down, pull elbows back squeezing lats.",
                duration: "3 sets x 12 reps",
                calories: "15-20 cal"
            },
            {
                name: "Lat Activation",
                description: "Arms overhead, pull down and back feeling lat engagement.",
                duration: "3 sets x 15 reps",
                calories: "10-15 cal"
            },
            {
                name: "Side Reach Stretch",
                description: "Reach one arm over head to opposite side.",
                duration: "Hold 30 seconds each side",
                calories: "5-8 cal"
            }
        ],
        intermediate: [
            {
                name: "Assisted Pull-ups",
                description: "Pull-ups with band assistance or partner help.",
                duration: "4 sets x 6-10 reps",
                calories: "30-40 cal"
            },
            {
                name: "Lat Pulldown Motion",
                description: "Simulate pulldown motion with focus on lat engagement.",
                duration: "4 sets x 15 reps",
                calories: "20-30 cal"
            },
            {
                name: "Inverted Rows (Wide Grip)",
                description: "Under table rows with wide grip targeting lats.",
                duration: "4 sets x 10-12 reps",
                calories: "40-50 cal"
            },
            {
                name: "Single Arm Lat Stretch",
                description: "Dynamic stretching focusing on lat mobility.",
                duration: "3 sets x 12 reps each arm",
                calories: "15-25 cal"
            },
            {
                name: "Lat Pullover (No Weight)",
                description: "Lie down, move arms overhead and back focusing on lats.",
                duration: "4 sets x 15 reps",
                calories: "25-35 cal"
            }
        ],
        professional: [
            {
                name: "Wide-Grip Pull-ups",
                description: "Pull-ups with wide grip maximizing lat engagement.",
                duration: "4 sets x 8-12 reps",
                calories: "60-80 cal"
            },
            {
                name: "Commando Pull-ups",
                description: "Pull-ups alternating sides of the bar.",
                duration: "3 sets x 6-10 reps",
                calories: "70-90 cal"
            },
            {
                name: "L-Sit Pull-ups",
                description: "Pull-ups maintaining L-sit position.",
                duration: "3 sets x 5-8 reps",
                calories: "80-100 cal"
            },
            {
                name: "One-Arm Pull-up Progression",
                description: "Advanced progression toward single arm pull-up.",
                duration: "3 sets x 3-5 reps",
                calories: "85-105 cal"
            },
            {
                name: "Muscle-Up",
                description: "Full muscle-up combining pull-up and dip.",
                duration: "3 sets x 3-5 reps",
                calories: "90-110 cal"
            }
        ]
    },
    
    thighs: {
        beginner: [
            {
                name: "Bodyweight Squats",
                description: "Basic squats keeping chest up and knees behind toes.",
                duration: "3 sets x 12-15 reps",
                calories: "20-30 cal"
            },
            {
                name: "Wall Sits",
                description: "Back against wall, slide down to sitting position.",
                duration: "3 sets x 20-30 seconds",
                calories: "15-25 cal"
            },
            {
                name: "Marching in Place",
                description: "High knees marching focusing on thigh engagement.",
                duration: "2 sets x 60 seconds",
                calories: "25-35 cal"
            },
            {
                name: "Leg Extensions (Seated)",
                description: "Sit in chair, extend one leg at a time.",
                duration: "3 sets x 15 reps each leg",
                calories: "15-20 cal"
            },
            {
                name: "Standing Quad Stretch",
                description: "Pull foot behind you to stretch front of thigh.",
                duration: "Hold 30 seconds each leg",
                calories: "5-8 cal"
            }
        ],
        intermediate: [
            {
                name: "Jump Squats",
                description: "Explosive squats jumping at the top.",
                duration: "4 sets x 12-15 reps",
                calories: "45-55 cal"
            },
            {
                name: "Lunges",
                description: "Step forward into lunge position, alternate legs.",
                duration: "4 sets x 12 reps each leg",
                calories: "40-50 cal"
            },
            {
                name: "Sumo Squats",
                description: "Wide stance squats targeting inner thighs.",
                duration: "4 sets x 15 reps",
                calories: "35-45 cal"
            },
            {
                name: "Step-ups",
                description: "Step up onto sturdy surface, alternate legs.",
                duration: "4 sets x 12 reps each leg",
                calories: "50-60 cal"
            },
            {
                name: "Bulgarian Split Squats",
                description: "Rear foot elevated single-leg squats.",
                duration: "3 sets x 10 reps each leg",
                calories: "45-55 cal"
            }
        ],
        professional: [
            {
                name: "Pistol Squats",
                description: "Single-leg squats requiring significant strength and balance.",
                duration: "3 sets x 5-8 reps each leg",
                calories: "60-80 cal"
            },
            {
                name: "Jump Lunges",
                description: "Explosive lunges switching legs in mid-air.",
                duration: "4 sets x 12-16 reps",
                calories: "70-90 cal"
            },
            {
                name: "Single-Leg Box Jumps",
                description: "Box jumps performed on one leg.",
                duration: "3 sets x 6-10 reps each leg",
                calories: "80-100 cal"
            },
            {
                name: "Shrimp Squats",
                description: "Advanced single-leg squat variation.",
                duration: "3 sets x 3-6 reps each leg",
                calories: "75-95 cal"
            },
            {
                name: "Plyometric Squats",
                description: "Multiple explosive squat variations in sequence.",
                duration: "4 sets x 30-45 seconds",
                calories: "85-105 cal"
            }
        ]
    },
    
    glutes: {
        beginner: [
            {
                name: "Glute Bridges",
                description: "Lie on back, lift hips squeezing glutes at top.",
                duration: "3 sets x 15 reps",
                calories: "15-25 cal"
            },
            {
                name: "Clamshells",
                description: "Side lying, open and close top leg like clamshell.",
                duration: "3 sets x 15 reps each side",
                calories: "12-18 cal"
            },
            {
                name: "Fire Hydrants",
                description: "On hands and knees, lift leg to side.",
                duration: "3 sets x 12 reps each side",
                calories: "15-20 cal"
            },
            {
                name: "Standing Hip Abduction",
                description: "Lift leg to side while standing, hold briefly.",
                duration: "3 sets x 12 reps each leg",
                calories: "10-15 cal"
            },
            {
                name: "Glute Squeeze",
                description: "Standing or lying, squeeze glutes and hold.",
                duration: "3 sets x 15 reps",
                calories: "8-12 cal"
            }
        ],
        intermediate: [
            {
                name: "Single-Leg Glute Bridges",
                description: "Glute bridges performed on one leg.",
                duration: "4 sets x 12 reps each leg",
                calories: "25-35 cal"
            },
            {
                name: "Lateral Walks",
                description: "Step sideways maintaining slight squat position.",
                duration: "4 sets x 15 steps each direction",
                calories: "30-40 cal"
            },
            {
                name: "Reverse Lunges",
                description: "Step backward into lunge, focus on glute engagement.",
                duration: "4 sets x 12 reps each leg",
                calories: "35-45 cal"
            },
            {
                name: "Hip Thrusts",
                description: "Shoulders on couch, thrust hips up squeezing glutes.",
                duration: "4 sets x 15 reps",
                calories: "40-50 cal"
            },
            {
                name: "Monster Walks",
                description: "Walk forward in squat position with side steps.",
                duration: "3 sets x 20 steps",
                calories: "35-45 cal"
            }
        ],
        professional: [
            {
                name: "Single-Leg Hip Thrusts",
                description: "Hip thrusts performed on one leg with full range.",
                duration: "4 sets x 10-12 reps each leg",
                calories: "50-70 cal"
            },
            {
                name: "Curtsy Lunge to Lateral Lunge",
                description: "Combination movement targeting glutes from multiple angles.",
                duration: "4 sets x 12 reps each side",
                calories: "60-80 cal"
            },
            {
                name: "Single-Leg Deadlifts",
                description: "Balance on one leg, hinge at hip with other leg extended back.",
                duration: "4 sets x 10 reps each leg",
                calories: "65-85 cal"
            },
            {
                name: "Glute Bridge March",
                description: "Hold bridge position while marching legs alternately.",
                duration: "4 sets x 20 marches",
                calories: "55-75 cal"
            },
            {
                name: "Plyometric Lateral Lunges",
                description: "Explosive side lunges with jump between sides.",
                duration: "4 sets x 12-16 reps",
                calories: "70-90 cal"
            }
        ]
    },
    
    calves: {
        beginner: [
            {
                name: "Calf Raises",
                description: "Rise up on toes, lower slowly with control.",
                duration: "3 sets x 15-20 reps",
                calories: "12-18 cal"
            },
            {
                name: "Ankle Circles",
                description: "Lift foot, make circles with ankle joint.",
                duration: "2 sets x 10 each direction, each foot",
                calories: "5-8 cal"
            },
            {
                name: "Wall Calf Stretch",
                description: "Hands on wall, step back to stretch calves.",
                duration: "Hold 30 seconds each leg",
                calories: "5 cal"
            },
            {
                name: "Seated Calf Raises",
                description: "Sitting, raise heels off ground using calf muscles.",
                duration: "3 sets x 20 reps",
                calories: "10-15 cal"
            },
            {
                name: "Toe Walks",
                description: "Walk on tip toes for short distances.",
                duration: "3 sets x 30 seconds",
                calories: "15-20 cal"
            }
        ],
        intermediate: [
            {
                name: "Single Calf Raises",
                description: "Calf raises performed on one leg at a time.",
                duration: "4 sets x 12-15 reps each leg",
                calories: "20-30 cal"
            },
            {
                name: "Jump Rope (No Rope)",
                description: "Simulate jump rope motion focusing on calf engagement.",
                duration: "4 sets x 60 seconds",
                calories: "40-50 cal"
            },
            {
                name: "Calf Raise Holds",
                description: "Rise on toes and hold position for time.",
                duration: "4 sets x 20-30 seconds",
                calories: "18-25 cal"
            },
            {
                name: "Lateral Calf Raises",
                description: "Calf raises with feet in different positions.",
                duration: "3 sets x 15 reps each position",
                calories: "25-35 cal"
            },
            {
                name: "Calf Bounce",
                description: "Small bouncing motion on balls of feet.",
                duration: "4 sets x 30 seconds",
                calories: "30-40 cal"
            }
        ],
        professional: [
            {
                name: "Single-Leg Hopping",
                description: "Hop on one foot focusing on calf power and control.",
                duration: "4 sets x 15-20 hops each leg",
                calories: "50-70 cal"
            },
            {
                name: "Depth Jump to Calf Raise",
                description: "Jump down from height, immediately into explosive calf raise.",
                duration: "3 sets x 8-10 reps",
                calories: "60-80 cal"
            },
            {
                name: "Single-Leg Calf Raise (Elevated)",
                description: "Single calf raises on step for increased range of motion.",
                duration: "4 sets x 12-15 reps each leg",
                calories: "45-65 cal"
            },
            {
                name: "Plyometric Calf Jumps",
                description: "Explosive jumps using primarily calf muscles.",
                duration: "4 sets x 10-15 jumps",
                calories: "65-85 cal"
            },
            {
                name: "Single-Leg Bounds",
                description: "Bounding forward on one leg, maximum calf engagement.",
                duration: "3 sets x 10 bounds each leg",
                calories: "70-90 cal"
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = exercisesData;
} 