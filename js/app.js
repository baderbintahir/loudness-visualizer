var mic, fft;

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    
    
    fft = new p5.FFT();
    fft.setInput(mic);
}

function draw() {
    getAudioContext().resume();

    background(255);
    var vol = mic.getLevel() * 3;

    if (windowHeight > windowWidth) {
        vol = lerp(50, windowWidth - 80, vol)
    } else {
        vol = lerp(50, windowHeight - 80, vol)
    }

    noFill()
    strokeWeight(100)

    c1 = color(0, 0, 0, 0.05)
    c2 = color('rgba(112, 230, 255, 0.05)');

    let frequency = getLoudestFrequency()

    switch (true) {
        case (frequency <= 64):
            c2 = color('rgba(112, 230, 255, 0.05)');
            break;

        case (frequency > 64 && frequency <= 100):
            c2 = color('rgba(0, 173, 255, 0.05)');
            break;

        case (frequency > 100 && frequency <= 200):
            c2 = color('rgba(77, 25595, 255, 0.05)');
            break;

        case (frequency > 200 && frequency <= 300):
            c2 = color('rgba(148, 166, 114, 0.05)');
            break;

        case (frequency > 300 && frequency <= 400):
            c2 = color('rgba(28, 239, 49, 0.05)');
            break;

        case (frequency > 400 && frequency <= 500):
            c2 = color('rgba(255, 95, 255, 0.05)');
            break;

        case (frequency > 500 && frequency <= 600):
            c2 = color('rgba(255, 81, 0, 0.05)');
            break;

        case (frequency > 600 && frequency <= 700):
            c2 = color('rgba(255, 0, 0, 0.05)');
            break;

        case (frequency > 700):
            c2 = color('rgba(0, 0, 0, 0.05)');
            break;
    }

    for (let r = 0; r < vol; r++) {
        let n = map(r, 0, vol, 0, 1)
        let newc = lerpColor(c1, c2, n)
        stroke(newc)
        ellipse(windowWidth / 2, windowHeight / 2, r, r);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function getLoudestFrequency() {
    var nyquist = sampleRate() / 2;
    var spectrum = fft.analyze();
    var numberOfBins = spectrum.length;
    var maxAmp = 0;
    var largestBin;

    for (var i = 0; i < numberOfBins; i++) {
        var thisAmp = spectrum[i];
        if (thisAmp > maxAmp) {
            maxAmp = thisAmp;
            largestBin = i;
        }
    }

    var loudestFreq = largestBin * (nyquist / numberOfBins);
    return loudestFreq;
}