<script>
  export let items = [];
  export let title = '';
  
  let searchTerm = '';
  let filteredItems = items;
  
  $: filteredItems = items.filter(item =>
    (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<div class="navigation-tree">
  <h2>{title}</h2>
  
  <div class="search-box">
    <input 
      type="text" 
      placeholder="Search {title.toLowerCase()}..."
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
        {#if item.tags && item.tags.length > 0}
          <div class="tags">
            {#each item.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
    
    {#if filteredItems.length === 0}
      <p class="no-results">No {title.toLowerCase()} found matching "{searchTerm}"</p>
    {/if}
  </div>
</div>

<style>
  .navigation-tree {
    margin-bottom: 2rem;
  }
  
  h2 {
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
  
  .tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  .tag {
    background: #f5f5f5;
    color: #666;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    font-size: 0.75rem;
  }
  
  .no-results {
    text-align: center;
    color: #999;
    padding: 2rem;
    font-style: italic;
  }
</style>
