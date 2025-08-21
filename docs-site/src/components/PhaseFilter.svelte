<script>
  export let items = [];
  export let initialPhase = 'all';
  
  let selectedPhase = initialPhase;
  let filteredItems = items;
  
  const phases = [
    { value: 'all', label: 'All Phases', color: '#666' },
    { value: 'PLAN', label: 'Plan', color: '#1565c0' },
    { value: 'BUILD', label: 'Build', color: '#7b1fa2' },
    { value: 'DEPLOY', label: 'Deploy', color: '#2e7d32' },
    { value: 'SUPPORT', label: 'Support', color: '#f57c00' }
  ];
  
  $: {
    filteredItems = selectedPhase === 'all' 
      ? items 
      : items.filter(item => item.phase === selectedPhase);
  }
  
  function handlePhaseChange(phase) {
    selectedPhase = phase;
    // Update URL without page reload
    const url = new URL(window.location);
    if (phase === 'all') {
      url.searchParams.delete('phase');
    } else {
      url.searchParams.set('phase', phase);
    }
    window.history.replaceState({}, '', url);
  }
</script>

<div class="phase-filter">
  <h3>Filter by SDLC Phase</h3>
  <div class="filter-buttons">
    {#each phases as phase}
      <button
        class="phase-button"
        class:active={selectedPhase === phase.value}
        style="--phase-color: {phase.color}"
        on:click={() => selectedPhase = phase.value}
      >
        {phase.label}
        {#if phase.value !== 'all'}
          <span class="count">
            {items.filter(item => item.phase === phase.value).length}
          </span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .phase-filter {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 6px;
  }
  
  h3 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1rem;
  }
  
  .filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .phase-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    color: #666;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .phase-button:hover {
    border-color: var(--phase-color);
    color: var(--phase-color);
  }
  
  .phase-button.active {
    background: var(--phase-color);
    border-color: var(--phase-color);
    color: white;
  }
  
  .count {
    background: rgba(255, 255, 255, 0.3);
    padding: 0.125rem 0.375rem;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .phase-button:not(.active) .count {
    background: #e9ecef;
    color: #666;
  }
</style>
