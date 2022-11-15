user_1 = User.create(
  email: "email@email.com",
  password: "mypassword",
  zip: "02145"
)

user_2 = User.create(
  email: "ilovegeckos@geckomail.com",
  password: "geckolover",
  zip: "12345"
)

pet_1 = Pet.find_or_create_by(
  name: "Spot",
  animal: "lizard", 
  species: "black and white tegu",
  gender: "male",
  user: user_1
)

pet_2 = Pet.find_or_create_by(
  name: "Pearl",
  animal: "lizard",
  species: "leopard gecko",
  gender: "female",
  user: user_2
)