import cv2 as cv

image1 = cv.imread("./uploads/new.png")
image1 = cv.resize(image1, (500, 500), interpolation=cv.INTER_CUBIC)

max_similarity = 0

for i in range(6):
    image = cv.imread(f"./sourabh/img{i+1}.jpeg")
    image = cv.resize(image, (500, 500), interpolation=cv.INTER_CUBIC)

    diff = cv.absdiff(image1, image)

    mean_diff = cv.mean(diff)

    similarity = 100 - mean_diff[0]

    if(similarity > max_similarity):
        max_similarity = similarity

    if(similarity >= 60):
        break

print(similarity)
