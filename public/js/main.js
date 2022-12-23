const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show')
}
const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show')
}

const generateImageRequest = async (prompt, size) => {
    try {
        showSpinner()

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        })

        if (!response.ok) {
            hideSpinner()
            throw new Error('A imagem não pode ser gerada!')
        }

        const data = await response.json()

        document.querySelector('#image').src = data.data

        hideSpinner()
    } catch (error) {
        document.querySelector('.msg').textContent = error
    }
}

const onSubmit = (e) => {
    e.preventDefault()

    document.querySelector('.msg').textContent = ''
    document.querySelector('#image').src = ''

    const prompt = document.querySelector('#prompt').value
    const size = document.querySelector('#size').value

    if (prompt === '') {
        alert('por favor, adicione uma descrição para a imagem')
    }

    generateImageRequest(prompt, size)
}

document.querySelector('#image-form').addEventListener('submit', onSubmit)