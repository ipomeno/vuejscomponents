<script setup>
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { onMounted } from 'vue';

onMounted(() => {
  const button = document.getElementById('button');
  const tooltip = document.getElementById('tooltip');
  const arrowElement = document.getElementById('arrow');

  computePosition(button, tooltip, {
    placement: 'bottom',
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowElement }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];

    Object.assign(arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    });
  });
});

function update() {
  const button = document.getElementById('button');
  const tooltip = document.getElementById('tooltip');
  const arrowElement = document.getElementById('arrow');

  computePosition(button, tooltip, {
    placement: 'bottom',
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowElement }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    console.log(middlewareData.arrow);
    const { x: arrowX, y: arrowY } = middlewareData.arrow;
    console.log(placement);

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];

    Object.assign(arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    });
  });
}

function showTooltip() {
  tooltip.style.display = 'block';
  update();
}

function hideTooltip() {
  tooltip.style.display = 'none';
}
</script>

<template>
  <div>
    <button id="button" arial-describeby="tooltip" 
      @mouseenter="showTooltip()" 
      @mouseleave="hideTooltip()"
      @focus="showTooltip()"
      @blur="hideTooltip()">
      MyButton
    </button>

    <div id="tooltip" role="tooltip">
      My Tooltip com dica de texto ainda maior.
      <div id="arrow"></div>
    </div>
  </div>
</template>

<style scoped>
#tooltip {
  display: none;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;

  background: #222;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
}

#arrow {
  position: absolute;
  background: #222;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}
</style>