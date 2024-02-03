<script setup>
import { inject } from 'vue';

const { activeStep, setStep } = inject('activeStep');

defineProps({
  stepsData: Object,
  activeStep: Number,
});

</script>

<template>
  <div class="scenario">
    <div class="scenario-wrapper">
      <div class="scenario__title">
        Сценарий {{ activeStep }}/{{ stepsData.steps[stepsData.steps.length - 1].step }}
      </div>
      <div v-html="stepsData.stepsText[`${activeStep-1}`].text" class="scenario__description">
      </div>
      <div class="scenario__steps">
        <div v-for="{step, text} in stepsData.steps" :key="step" class="scenario__step-item" :class="{'scenario__step-item_target': activeStep == step, 'scenario__step-item_done': activeStep > step}">
          <button type="button" :disabled="(activeStep<step)" class="scenario__step-item-circle" @click="setStep({step})">0{{ step }}</button>
          <div class="scenario__step-item-descr">{{ text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";

.scenario-wrapper {
  background-color: $whiteblue;
  border-radius: 8px;
  padding: 32px;

  button {
    border: none;

    &:disabled {
      cursor: default;
    }
  }
}

.scenario {
  color: $black;
  font-size: 21px;
  margin-bottom: 16px;

  &__description {
    color: $darkgrey;
    font-size: 16px;
    margin-bottom: 42px;
    max-width: 520px;
  }

  &__steps {
    display: flex;
  }

  &__step {
    &-item:not(:last-child) {
      .scenario__step-item-circle:after {
        content: "";
        width: 100%;
        height: 2px;
        background: $grey;
        position: absolute;
        top: 20%;
        right: -40px;
      }
    }

    &-item {
      width: 300px;
      position: relative;

      &-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        padding: 8px;
        border-radius: 50%;
        margin-bottom: 12px;
        font-size: 18px;
        color: $whiteblue;
        background-color: $grey;
      }

      &-descr {
        color: $grey;
        font-size: 16px;
      }

      &_done {
        .scenario__step-item-circle {
          cursor: pointer;
          color: $whiteblue;
          background-color: $blue;

          &:after {
            background-color: $blue !important;
          }
        }

        .scenario__step-item-descr {
          color: $black;
        }
      }

      &_target {
        .scenario__step-item-circle {
          color: $black;
          border: 2px solid $blue;
          background-color: $whiteblue;

          &:after {
            background: linear-gradient(90deg,
                $blue 0%,
                $whiteblue 100%) !important;
          }
        }

        .scenario__step-item-descr {
          color: $black;
        }
      }
    }

    &-item:last-child {
      .scenario__step-item-descr {
        width: 100%;
      }
    }
  }
}

@include for-phone-only {
  .scenario-wrapper {
    padding: 24px;
  }

  .scenario__steps {
    flex-direction: column;
  }

  .scenario__step {
    &-item {
      display: flex;
      gap: 20px;
      width: 100%;

      &-circle {
        flex-shrink: 0;
      }

      &-descr {
        width: 100%;
      }
    }
  }

  .scenario__step-item:not(:last-child) {
    .scenario__step-item-circle:after {
      width: 0;
      height: 0;
    }
  }
}
</style>
