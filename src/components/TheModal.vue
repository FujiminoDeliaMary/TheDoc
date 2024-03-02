<script setup>

const props = defineProps({
    showModal: {
        Type: Boolean
    }
})

</script>

<template>
 <transition name="modal">
        <div class="modal-mask" v-if="props.showModal"  >
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header text-lg font-bold">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer flex gap-5 justify-end">
                <slot name="footer">
                  default footer
                  <slot name="close">
                    <button class="modal-default-button" @click="$emit('close')">
                        OK
                    </button>
                  </slot>
                  
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    
</template>