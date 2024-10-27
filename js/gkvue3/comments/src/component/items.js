
export const Items = {
    props: ['name', 'letter', 'text', 'icon', 'data', 'timedata', 'elementId', 'id', 'isauthor', 'show'],
    data() {
        return {
            show: true
        }
    },
    template: `
        <transition :duration="500">
            <div class="comment-item" :data-id="id" v-if="show">
                <div class="header-top">
                    <div class="f-left">
                        <div class="f-circle">
                            <div class="letter">{{letter}}</div>
                        </div>
                        <div class="f-content">
                            <div>{{name}}</div>
                            <div v-if="(timedata=='')">{{data}}</div>
                            <div v-else>{{timedata}}</div>
                        </div>
                    </div>
                </div>
                <div class="text">{{text}}</div>
                <div class="socnet-button">
                    <i class="fa fa-commenting" aria-hidden="true" title="Комментировать" @click="$emit('messageCallback', 'recomment', id)"></i>
                    <i class="fa fa-pencil" aria-hidden="true" title="Редактировать" @click="$emit('messageCallback', 'edit', id)"></i>
                    <i class="fa fa-trash" aria-hidden="true" title="удалить" @click="$emit('messageCallback', 'delete', id)" @click="show = !show"></i>
                </div>
            </div>
        </transition>
    `
}