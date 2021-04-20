function bewegeDinoUm (pixel: number) {
    for (let Index = 0; Index <= Math.abs(pixel) - 1; Index++) {
        if (pixel > 0) {
            dino.change(LedSpriteProperty.Y, -1)
        } else {
            dino.change(LedSpriteProperty.Y, 1)
        }
        basic.pause(100 + Index * 100)
    }
    return 0
}
input.onButtonPressed(Button.A, function () {
    bewegeDinoUm(3)
    bewegeDinoUm(-3)
})
function erzeugeHindernis () {
    hindernisse = [game.createSprite(4, 3)]
    if (Math.randomBoolean()) {
        hindernisse.push(game.createSprite(4, 2))
    } else {
        hindernisse.push(game.createSprite(4, 4))
    }
}
input.onButtonPressed(Button.B, function () {
    bewegeDinoUm(-1)
    basic.pause(500)
    bewegeDinoUm(1)
})
function bewegeHindernis () {
    for (let hindernis of hindernisse) {
        hindernis.change(LedSpriteProperty.X, -1)
        if (hindernis.get(LedSpriteProperty.X) == 0) {
            hindernis.delete()
        }
        erzeugeHindernis()
    }
    if (true) {
    	
    }
    basic.pause(500)
}
let hindernisse: game.LedSprite[] = []
let dino: game.LedSprite = null
dino = game.createSprite(0, 3)
erzeugeHindernis()
basic.forever(function () {
    bewegeHindernis()
})
