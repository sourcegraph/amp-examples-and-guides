<script>
  export let items = [];
  export let initialPhase = 'all';
  
  let selectedPhase = initialPhase;
  let searchTerm = '';
  
  const phases = [
    { value: 'all', label: 'All Phases', color: '#666' },
    { value: 'PLAN', label: 'Plan', color: '#1565c0' },
    { value: 'BUILD', label: 'Build', color: '#7b1fa2' },
    { value: 'DEPLOY', label: 'Deploy', color: '#2e7d32' },
    { value: 'SUPPORT', label: 'Support', color: '#f57c00' }
  ];
  
  $: filteredItems = items
    .filter(item => selectedPhase === 'all' || item.phase === selectedPhase)
    .filter(item =>
      (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  
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

<div class="guides-interface">
  <!-- Phase Filter -->
  <div class="phase-filter">
    <h3>Filter by SDLC Phase</h3>
    <div class="filter-buttons">
      {#each phases as phase}
        <button
          class="phase-button"
          class:active={selectedPhase === phase.value}
          style="--phase-color: {phase.color}"
          on:click={() => handlePhaseChange(phase.value)}
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
  
  <!-- Navigation Tree -->
  <div class="navigation-tree">
    <h2>Guides</h2>
    
    <div class="search-box">
      <input 
        type="text" 
        placeholder="Search guides..."
        bind:value={searchTerm}
      />
    </div>
    
    <div class="items-list">
      {#each filteredItems as item}
        <div class="item-card">
          <h3>
            <a href={item.url}>{item.title || 'Untitled'}</a>
          </h3>
          <p class="description">{item.description || 'No description available'}</p>
          {#if item.phase}
            <span class="phase-badge phase-{item.phase.toLowerCase()}">{item.phase}</span>
          {/if}
        </div>
      {/each}
      
      {#if filteredItems.length === 0}
        <p class="no-results">
          No guides found
          {#if selectedPhase !== 'all'}for {selectedPhase} phase{/if}
          {#if searchTerm}matching "{searchTerm}"{/if}
        </p>
      {/if}
    </div>
  </div>
</div>

<style>
  .guides-interface {
    margin-bottom: 2rem;
  }
  
  .phase-filter {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 6px;
  }
  
  .phase-filter h3 {
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
  
  .navigation-tree {
    margin-bottom: 2rem;
  }
  
  .navigation-tree h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .search-box {
    margin-bottom: 1.5rem;
  }
  
  .search-box input {
    width: 100%;
    max-width: 400px;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .search-box input:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  }
  
  .items-list {
    display: grid;
    gap: 1rem;
  }
  
  .item-card {
    border: 1px solid #e9ecef;
    border-radius: 6px;
    padding: 1.5rem;
    background: #fff;
    transition: box-shadow 0.2s ease;
  }
  
  .item-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .item-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  .item-card h3 a {
    color: #0066cc;
    text-decoration: none;
  }
  
  .item-card h3 a:hover {
    text-decoration: underline;
  }
  
  .description {
    color: #666;
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }
  
  .phase-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .phase-plan { background: #e3f2fd; color: #1565c0; }
  .phase-build { background: #f3e5f5; color: #7b1fa2; }
  .phase-deploy { background: #e8f5e8; color: #2e7d32; }
  .phase-support { background: #fff3e0; color: #f57c00; }
  
  .no-results {
    text-align: center;
    color: #999;
    padding: 2rem;
    font-style: italic;
  }
</style>
