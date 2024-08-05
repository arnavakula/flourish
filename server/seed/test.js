const OpenAI = require("openai");
const fs = require('fs');

const openai = new OpenAI();

const onion = {
        "content": {
            "water": {
                "value": 0.8911,
                "unit": "grams"
            },
            "energy": {
                "value": 0.4,
                "unit": "kilocalories"
            },
            "protein": {
                "value": 0.011,
                "unit": "grams"
            },
            "fat": {
                "value": 0.001,
                "unit": "grams"
            },
            "carbohydrate": {
                "value": 0.0934,
                "unit": "grams"
            },
            "dietary fiber": {
                "value": 0.017,
                "unit": "grams"
            },
            "sugars": {
                "value": 0.0424,
                "unit": "grams"
            },
            "calcium": {
                "value": 0.00023,
                "unit": "grams"
            },
            "iron": {
                "value": 2.1e-06,
                "unit": "grams"
            },
            "magnesium": {
                "value": 0.0001,
                "unit": "grams"
            },
            "phosphorus": {
                "value": 0.00029,
                "unit": "grams"
            },
            "potassium": {
                "value": 0.00146,
                "unit": "grams"
            },
            "sodium": {
                "value": 4e-05,
                "unit": "grams"
            },
            "zinc": {
                "value": 1.7e-06,
                "unit": "grams"
            },
            "vitamin c": {
                "value": 7.4e-05,
                "unit": "grams"
            },
            "thiamin": {
                "value": 4.6e-07,
                "unit": "grams"
            },
            "riboflavin": {
                "value": 2.7e-07,
                "unit": "grams"
            },
            "niacin": {
                "value": 1.16e-06,
                "unit": "grams"
            },
            "vitamin b-6": {
                "value": 1.2e-06,
                "unit": "grams"
            },
            "dietary folate": {
                "value": 1.9e-07,
                "unit": "grams"
            },
            "vitamin b-12": {
                "value": 0,
                "unit": "grams"
            },
            "vitamin a": {
                "value": 0,
                "unit": "grams"
            },
            "vitamin e": {
                "value": 2e-07,
                "unit": "grams"
            },
            "vitamin d2 and d3": {
                "value": 0,
                "unit": "grams"
            },
            "vitamin d": {
                "value": 0,
                "unit": "grams"
            },
            "vitamin k": {
                "value": 4e-09,
                "unit": "grams"
            },
            "saturated fat": {
                "value": 0.00042,
                "unit": "grams"
            },
            "monounsaturated fat": {
                "value": 0.00013,
                "unit": "grams"
            },
            "polyunsaturated fat": {
                "value": 0.00017,
                "unit": "grams"
            },
            "cholesterol": {
                "value": 0,
                "unit": "grams"
            },
            "caffeine": {
                "value": 0,
                "unit": "grams"
            }
        },
        "cultivationCategory": "vegetable",
        "edibleParts": [
            "bulb"
        ],
        "germination": {
            "duration": {
                "max": 21,
                "min": 8,
                "unit": "days"
            },
            "rate": 0.7
        },
        "hardinessZone": {
            "max": 9,
            "min": 3
        },
        "harvest": {
            "duration": {
                "max": 7,
                "min": 7
            }
        },
        "name": "onion",
        "plantings": [
            {
                "depth": {
                    "size": 0,
                    "unit": "inch"
                },
                "duration": {
                    "max": 70,
                    "min": 42
                },
                "spacing": {
                    "size": 0.1,
                    "unit": "inch"
                }
            },
            {
                "depth": {
                    "size": 6,
                    "unit": "inch"
                },
                "duration": {
                    "max": 119,
                    "min": 98
                },
                "spacing": {
                    "size": 4,
                    "unit": "inch"
                }
            }
        ],
        "soilImpact": "light feeder",
        "species": "Allium cepa",
        "sun": {
            "max": "full sun",
            "min": "part shade"
        },
        "yield": {
            "units": "grams per square foot",
            "value": 4448
        }
    }

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a knowledgeable gardening assistant." },
        { 
            role: 'user', 
            content: `I need a gardening schedule based on the following crop information and location. 
            Crop information: ${JSON.stringify(onion)}. 
            I want to plant starting from ${`today`}. Location: zip code ${`78641`}. 
            Please provide a schedule with detailed steps. I want this schedule in an object format.
            Create an object such that the keys are the steps, and for each key the value describes the step.
            Each key should have a start date, end date, and a very detailed description of what to do.
            Only return a String that contains the object (first character is { and last character is })
            Here are some example keys: germination, growing, harvesting.
            All time units are given in days unless otherwise specified. Make sure to emphasize the crop information.
            `
        }
    ],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
  console.log(completion.choices[0].message.content);
  
  const match = completion.choices[0].message.content.match(/{[\s\S]*}/);

    if (match) {
    const sched = JSON.parse(match); // Access the first element of the match array

    // Save the JSON object to a file
    fs.writeFile('file.json', JSON.stringify(sched, null, 2), (err) => {
        if (err) {
        console.error('Error writing to file:', err);
        } else {
        console.log('JSON data saved to file.json');
        }
    });
    } else {
    console.error('No JSON object found in the response.');
    }
  
}   

main();