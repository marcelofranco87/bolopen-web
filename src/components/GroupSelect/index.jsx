import { Icon } from '~/components/Icon'

export const GroupSelect = ({ currentGroup, onChange }) => {    

    const prevGroup = () => {
        const prev = (currentGroup == 'a' ? 'h' : String.fromCharCode(currentGroup.charCodeAt(0) - 1))
        onChange(prev)
    }

    const nextGroup = () => {
        const next = (currentGroup == 'h' ? 'a' : String.fromCharCode(currentGroup.charCodeAt(0) + 1))
        onChange(next)
    }

    // let sectionTitle = ''

    // if (currentGroup.charCodeAt(0) > 'h'.charCodeAt(0)) {
    //     switch(currentGroup) {
    //         case 'i':
    //             sectionTitle = 'oitavas de final'
    //             break
    //         case 'j':
    //             sectionTitle = 'quartas de final'
    //             break
    //         case 'k':
    //             sectionTitle = 'semifinal'
    //             break
    //         case 'l':
    //             sectionTitle = 'terceiro lugar'
    //             break
    //         case 'm':
    //             sectionTitle = 'final'
    //     }
    // } else {
    //     sectionTitle = `grupo ${currentGroup}`
    // }

    return (
        <div className="p-4 flex space-x-4 justify-between">
            <Icon name="arrowLeft" className="w-6 text-green-500" onClick={prevGroup} />
            <span className="uppercase font-bold">grupo {currentGroup}</span>
            <Icon name="arrowRight" className="w-6 text-green-500" onClick={nextGroup} />
        </div>
    )
}