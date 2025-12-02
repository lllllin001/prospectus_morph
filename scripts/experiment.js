// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {
    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    
    // Shuffle all images and use them for all three blocks (same order for all blocks)
    const shuffled_images = _.shuffle(all_images);
    
    // Create trial data arrays for each block (all use the same shuffled image list)
    const sex_block_trials = shuffled_images.map(function(image) {
        return { image: image };
    });
    
    const gender_block_trials = shuffled_images.map(function(image) {
        return { image: image };
    });
    
    const age_block_trials = shuffled_images.map(function(image) {
        return { image: image };
    });
    
    const ai_block_trials = shuffled_images.map(function(image) {
        return { image: image };
    });
    
    this.trial_info.sex_block_trials = sex_block_trials;
    this.trial_info.gender_block_trials = gender_block_trials;
    this.trial_info.age_block_trials = age_block_trials;
    this.trial_info.ai_block_trials = ai_block_trials;
    
    // Randomize the order of sex and gender blocks (0 = sex first, 1 = gender first)
    const blockOrder = Math.random() < 0.5 ? 'sex_first' : 'gender_first';
    this.global_data.block_order = blockOrder;
    
    console.log("Block order:", blockOrder);
    console.log("Total images per block:", shuffled_images.length);
    
    // Build view sequence
    this.views_seq = [intro];
    this.views_seq.push(instructions);
    
    // Add practice trials (5 trials)
    for (let i = 0; i < 5; i++) {
        this.views_seq.push(practice);
    }
    
    // Add instructions2
    this.views_seq.push(instructions2);
    
    // Add sex and gender blocks in random order
    if (blockOrder === 'sex_first') {
        // Sex block
        this.views_seq.push(sexBlockInstructions);
        for (let i = 0; i < sex_block_trials.length; i++) {
            this.views_seq.push(sexTrial);
        }
        
        // Gender block
        this.views_seq.push(genderBlockInstructions);
        for (let i = 0; i < gender_block_trials.length; i++) {
            this.views_seq.push(genderTrial);
        }
    } else {
        // Gender block
        this.views_seq.push(genderBlockInstructions);
        for (let i = 0; i < gender_block_trials.length; i++) {
            this.views_seq.push(genderTrial);
        }
        
        // Sex block
        this.views_seq.push(sexBlockInstructions);
        for (let i = 0; i < sex_block_trials.length; i++) {
            this.views_seq.push(sexTrial);
        }
    }
    
    // Age block always comes after sex/gender blocks
    this.views_seq.push(ageBlockInstructions);
    for (let i = 0; i < age_block_trials.length; i++) {
        this.views_seq.push(ageTrial);
    }
    
    // AI block always comes last
    this.views_seq.push(aiBlockInstructions);
    for (let i = 0; i < ai_block_trials.length; i++) {
        this.views_seq.push(aiTrial);
    }
    
    this.views_seq.push(postTest);
    this.views_seq.push(thanks);

    // adds progress bars to the views listed
    this.progress_bar_in = ["sexTrial", "genderTrial", "ageTrial", "aiTrial"];
    // styles: chunks, separate or default
    this.progress_bar_style = "default";
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
