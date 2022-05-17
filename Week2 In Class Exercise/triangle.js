
/* TODO - Return the triangle calculations by calling your helper functions.
This function will be used in your eventListener
to print out the correct information about the triangle to your index.html page */
function triangleOutput(){
    /* Fetches the values from the form. Notice that they have 
    id=value1, value2 and value3 in the HTML */
    const a = parseFloat(document.getElementById('value1').value);
    const b = parseFloat(document.getElementById('value2').value);
    const c = parseFloat(document.getElementById('value3').value);
    if (checkTriangle(a,b,c) === True ){
        /*TODO */
        ;
    }
    else{
        return "The given sides do not form a triangle";
    }
}


/* TODO - Below are suggested functions .
You do not have to use them, but it is recommended */

/*  Check if triangle */
function checkTriangle(side1, side2, side3){
    if (side1 > 0 && side2 > 0 && side3 > 0) {
        return true;
    }
    else {
        return false;
    }
}

/* Check if Equilateral, Isosceles or Scalene */
function getTriangleType(side1,side2,side3){
    if ((side1 == side2) && (side1 == side3)) {
        return "EQUILATERAL";
    }
    else if ((side1 == side2) || (side1 == side3) || (side2 == side3)) {
        return "ISOSCELES";
    }
    else {
        return "SCALENE";
    }
}


/* Calculate perimeter */
function perimeter (side1, side2, side3) {

}
/* Check if acute, right or obtuse */
function acuteRightObtuse (side1, side2, side3) {

}

/* Function that gets the triangle angles*/
function getTriangleAngles(side1, side2, side3){
  const angleA1 =  Math.acos(((b*b) + (c*c) - (a*a))/(2*b*c));
  const angleB2 =  Math.acos(((c*c) + (a*a) - (b*b))/(2*c*a));
  const angleC3 =  Math.acos(((a*a) + (b*b) - (c*c))/(2*b*a));

  angleA = angleA1*(180/Math.PI);
  angleB = angleB2*(180/Math.PI);
  angleC = angleC3*(180/Math.PI);

  return [angleA, angleB, angleC];
}

/* Calculate the area */
function getArea(side1, side2, side3){

}

/* TODO - Create the Event listener, which calls the result of triangleOutput()*/