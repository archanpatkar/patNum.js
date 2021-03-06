class PSet
{
    constructor(...values)
    {
        this.data = [];
        this.length = 0;
        for(let v of values)
        {
            if(!(v in this.data))
            {
                this.data.push(v);
                length++;
            }
        }
    }

    get(index)
    {
        if(index<0) index = this.length - index;
        if(index < this.length)
        {
            return this.data[index];
        }
    }

    add(v)
    {
        if(!(v in this.data)) this.data.push(v);
    }

    has(v)
    {
        if(v in this.data) return true;
        return false;
    }

    subset(s)
    {
        if(s instanceof PSet)
        {
            let decider = false;
            for(let v of s.data)
            {
                if(!(v in this.data)) decider = false;
            }
            return decider;
        }
        throw new TypeError("Please send a PSet Object");
    }

    cardinality()
    {
        return this.data.length;
    }

    powerset()
    {
        let ns = PSet();
        ns.add(new PSet());
        for(let d of this.data)
        {
            ns.add(new PSet(d));
            
            for(let d2 of this.data)
            {
                if(d != d1) ns.add();
            } 
        } 


        let ns = new PSet();
        for(let i = 0;i < ns.data.length-1;i++)
        {
            
        }
    }

    union(s)
    {
        if(s instanceof PSet)
        {
            let data = [];
            for(let v of this.data) data.push(v);
            for(let v of s.data) !(v in data)?data.push(v):0;
            return new PSet(...data);
        }
        throw new TypeError("Please send a PSet Object");
    }

    intersect(s)
    {
        if(s instanceof PSet)
        {
            
        }
        throw new TypeError("Please send a PSet Object");
    }

    complement(u)
    {
        if(s instanceof PSet)
        {
            let ns = new PSet();
            for(let d of u)
            {
                if(!(d in this.data)) ns.add(d);
            }
            return ns;
        }
        throw new TypeError("Please send a PSet Object");
    }

    cartesian(s)
    {
        if(s instanceof PSet)
        {
           let ns = new PSet();
           for(let d1 of this.data)
           {
               for(d2 of s.data)
               {
                    let temp = [];
                    temp.push(d1);
                    temp.push(d2);
                    ns.add(ns);
               }
           } 
           return ns;
        }
        throw new TypeError("Please send a PSet Object");
    }

    substract(s)
    {
        if(s instanceof PSet)
        {
            let ns = new PSet();
            for(let d of this.data)
            {
                if(!(d in s.data)) ns.add(d);
            }
            return ns;
        }
        throw new TypeError("Please send a PSet Object");
    }
}