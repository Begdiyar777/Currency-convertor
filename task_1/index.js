import {encoded, translations} from './data.js'

function decode(encoded, translations){
    // Переменная для хранения уникальных id
    const uniqueIds = new Set()

    // Функция для проверки валидности ключа
    const isValid = (key) => {
        return key.endsWith('Id') &&  
        !['groupId', 'service', 'formatSize', 'ca'].includes(key)
    }

    const decoded = encoded.map((item) => {
        //создаем копию текущего объекта
        const decodedItem = {...item}
        for(let key in decodedItem){
            //Если ключ валидный и он не null
            if(isValid(key) && decodedItem[key] != null){
                // Если значение ключа есть в translations
                translations.hasOwnProperty(decodedItem[key]) ? 
                // Расшифровываем его
                decodedItem[key] = translations[decodedItem[key]] :
                // Иначе он уикальный 
                uniqueIds.add(decodedItem[key])
            }
        }
        // возвращаем расшифрованный объект
        return decodedItem
    })

    // возвращаем результат
    return {
        uniqueIds: Array.from(uniqueIds),
        decoded
    }

}

// Деструктуризация результата
const {uniqueIds, decoded} = decode(encoded, translations)

// Вывод на консоль
console.log('Список уникальных Id:', uniqueIds)
console.log("Расшифрованный список объектов:", decoded)

/* Пространственная сложность O(n*k + u), где 
     n - количество элементов в массиве
     k - количество ключей в объекте 
     u - количество уникальных id */

/* Временная сложность сложность O(n*k + u), где 
     n - количество элементов в массиве
     k - количество ключей в объекте */

