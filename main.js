
let currentTime = new Date()
render(currentTime)

g('#lastMonth').onclick = () => {
    const 月初 = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
    render(new Date(月初 - 86400 * 1000))
}
g('#nextMonth').onclick = () => {
    const 下月初 = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)
    render(下月初)
}
g('#today').onclick = () => {
    const alterMonth = new Date()
    render(alterMonth)
}

//帮助函数
function render(time) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1

    initTime()
    generateDays()

    currentTime = time

    function initTime() {
        const time = g('#time')
        time.textContent = `${year}年${month}月`
    }

    function generateDays() {
        const 月初 = new Date(year, month - 1, 1)
        const 月初星期几 = 月初.getDay()
        const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
        const 月末几号 = 月末.getDate()
        const 月末星期几 = 月末.getDay()
        const days = g('#days')
        days.innerHTML = ''
        let n = 0

        for (let i = 1; i < 月初星期几; i++) {
            const li = document.createElement('li')
            const d = new Date(月初 - 86400 * 1000 * i)
            li.textContent = d.getDate()
            li.classList.add('calender-days-disabled')
            li.onclick = () => {
                if (selectLi) {
                    selectLi.classList.remove('calender-days-select')
                }
                li.classList.add('calender-days-select')
                selectLi = li
            }
            days.prepend(li)
            n += 1
        }

        const 这个月多少天 = 月末几号
        const now = new Date()
        let selectLi
        for (let i = 1; i <= 这个月多少天; i++) {
            const li = document.createElement('li')
            li.textContent = i
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add('calender-days-today')

            }
            li.onclick = () => {
                if (selectLi) {
                    selectLi.classList.remove('calender-days-select')
                }
                li.classList.add('calender-days-select')
                selectLi = li
                if (events) {
                    g('#events').innerHTML = events.toString()
                } else {
                    g('#events').innerHTML = '无'
                }
                g('#event').innerHTML = ''
            }
            const key = `${year}-${month}-${i}`
            const events = window.data[key]
            console.log(key, events)
            if (events) {
                li.classList.add('calender-days-hasEvents')
            }
            days.append(li)
            n += 1

        }
        let i = 月末星期几 + 1
        for (let j = 0; j < 42 - n; j++) {
            const delta = i - 月末星期几
            const li = document.createElement('li')
            const d = new Date(月末 - 0 + 86400 * 1000 * delta)
            li.textContent = d.getDate()
            li.classList.add('calender-days-disabled')
            li.onclick = () => {
                if (selectLi) {
                    selectLi.classList.remove('calender-days-select')
                }
                li.classList.add('calender-days-select')
                selectLi = li
            }
            days.append(li)
            i++
        }
    }
}


function g(selector) {
    return document.querySelector(selector)
}
function gs(selector) {
    return document.querySelectorAll(selector)
}